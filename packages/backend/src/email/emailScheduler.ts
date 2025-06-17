import { getDb, schema } from "@tambo-ai-cloud/db";
import type { HydraDb } from "@tambo-ai-cloud/db";
import { and, eq, lte } from "drizzle-orm";
import { Resend } from "resend";
import { emailTemplates } from "./templates";

/**
 * When a schedule row has a `condition`, treat any trimmed string equal
 * to "true" (case-insensitive) as a truthy value.  Missing / empty
 * conditions are considered satisfied by default.
 */
function isConditionMet(condition: string | null | undefined) {
  if (!condition) return true;
  return condition.trim().toLowerCase() === "true";
}

/**
 * Send an email using a template in packages/backend/src/email/templates.
 */
async function sendEmail(
  to: string,
  component: string,
  props: Record<string, unknown>,
) {
  const template = (emailTemplates as Record<string, any>)[component];
  if (!template) throw new Error(`Unknown template ${component}`);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // silently skip if Resend is not configured

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "tambo-ai <noreply@updates.tambo.co>",
    to,
    subject: template.subject(props),
    html: template.html(props),
  });
}

/**
 * Process all pending schedules that are due for sending.  Rows marked as
 * "pending" and with `sendAt <= now` are selected.  If the optional
 * `condition` column evaluates to true, the email is dispatched and the
 * row is marked "sent"; otherwise it is marked "skipped".
 */
export async function processEmailSchedules(db: HydraDb) {
  const now = new Date();

  const rows = await db.query.emailSchedules.findMany({
    where: and(
      eq(schema.emailSchedules.status, "pending"),
      lte(schema.emailSchedules.sendAt, now),
    ),
  });

  for (const row of rows) {
    if (isConditionMet(row.condition)) {
      await sendEmail(
        row.recipient,
        row.component,
        (row.props ?? {}) as Record<string, unknown>,
      );

      await db
        .update(schema.emailSchedules)
        .set({
          status: "sent",
          sentAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(schema.emailSchedules.id, row.id));
    } else {
      await db
        .update(schema.emailSchedules)
        .set({
          status: "skipped",
          updatedAt: new Date(),
        })
        .where(eq(schema.emailSchedules.id, row.id));
    }
  }
}

/**
 * Entry point for the worker.  Establishes a DB connection using
 * DATABASE_URL and runs a single processing pass.  Intended to be called
 * from a scheduled job (e.g. cron, Supabase edge function, etc.).
 */
export async function runEmailScheduler() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL env not set");

  const db = getDb(databaseUrl);
  await processEmailSchedules(db);
}
