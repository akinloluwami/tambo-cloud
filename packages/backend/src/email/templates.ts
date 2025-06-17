export interface EmailTemplate<T extends Record<string, unknown> = any> {
  subject: (props: T) => string;
  html: (props: T) => string;
}

type FollowUpNoApiKeyProps = {
  firstName?: string | null;
  dashboardUrl: string;
};

type FollowUpNoMessagesProps = {
  firstName?: string | null;
};

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const emailTemplates = {
  followUpNoApiKey: {
    subject: () => "need a hand getting started?",
    html: ({ firstName, dashboardUrl }: FollowUpNoApiKeyProps) => {
      const name = firstName || "there";
      return `
        <p>hi ${escapeHtml(name)},</p>
        <p>we noticed you haven’t generated an API key yet. here’s the fastest way to spin up your first project:</p>
        <ol>
          <li>open your dashboard → <a href="${dashboardUrl}">${dashboardUrl}</a></li>
          <li>click “create API key”</li>
          <li>run: <code>npx create-tambo@latest</code></li>
          <li>paste the key when prompted</li>
        </ol>
        <p>questions? just reply and we’ll jump in.</p>
        <p>— michael & the tambo team</p>
      `;
    },
  } as EmailTemplate<FollowUpNoApiKeyProps>,
  followUpNoMessages: {
    subject: () => "ready to see tambo in action?",
    html: ({ firstName }: FollowUpNoMessagesProps) => {
      const name = firstName || "there";
      return `
        <p>hi ${escapeHtml(name)},</p>
        <p>looks like your API key is set, but no messages have been sent yet.</p>
        <p>if you’d like a quick walkthrough or help wiring up your first component, grab a slot on my calendar: <a href="https://cal.com/michaelmagan">https://cal.com/michaelmagan</a></p>
        <p>talk soon!</p>
        <p>— michael</p>
      `;
    },
  } as EmailTemplate<FollowUpNoMessagesProps>,
} as const;
