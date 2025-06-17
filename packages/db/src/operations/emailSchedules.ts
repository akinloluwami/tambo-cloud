import { emailSchedules } from "../schema";
import type { HydraDb } from "../types";

export interface ScheduleEmailInput {
  /** Recipient email address */
  to: string;
  /** Name of the transactional email React component to render */
  component: string;
  /** Props to be passed to the email component during render */
  props: Record<string, unknown>;
  /** When the email should be sent (UTC) */
  sendAt: Date;
  /** Optional SQL condition string – email will only be sent if it evaluates to TRUE */
  condition?: string | null;
}

/**
 * Persist a pending email schedule in the database.
 *
 * The returned row mirrors the `email_schedules` table schema.
 */
export async function scheduleEmail(
  db: HydraDb,
  { to, component, props, sendAt, condition }: ScheduleEmailInput,
) {
  const [row] = await db
    .insert(emailSchedules)
    .values({
      recipient: to,
      component,
      props,
      sendAt,
      condition,
      status: "pending",
    })
    .returning();

  return row;
}
