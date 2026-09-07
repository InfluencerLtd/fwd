/**
 * email.ts  (server only)
 * ---------------------------------------------------------------------------
 * Turns a template from src/content/emails.ts into an email, and sends it.
 *
 * The design is deliberately plain and built from tables with inline styles,
 * because email programs are years behind browsers and anything clever breaks
 * in Outlook. It uses the same colours as the site, and a serif that most
 * machines already have, since custom fonts do not load reliably in email.
 */

import { BRAND, CONTACT } from "@/lib/brand";
import { EMAIL_FOOTER, type EmailTemplate } from "@/content/emails";
import { createToken, isLinkSecretConfigured } from "@/lib/tokens";

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const COLOR = {
  ground: "#0b100c",
  paleBlue: "#b1e3fc",
  paper: "#f7f6f3",
  ink: "#0e1116",
  inkMuted: "#5a6472",
  border: "#e3e0da",
  accent: "#004ad5",
};

export type EmailRecipient = { name: string; email: string };

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || fullName.trim();
}

function unsubscribeUrl(email: string): string {
  if (!isLinkSecretConfigured()) return `${CONTACT.siteUrl}/unsubscribe`;
  // A year, because somebody may unsubscribe from an old email.
  const token = createToken("unsubscribe", email, 60 * 60 * 24 * 365);
  return `${CONTACT.siteUrl}/unsubscribe?t=${encodeURIComponent(token)}`;
}

function fill(text: string, to: EmailRecipient): string {
  return text
    .replaceAll("{name}", firstName(to.name))
    .replaceAll("{signInUrl}", `${CONTACT.siteUrl}/clubhouse`)
    .replaceAll("{contactEmail}", CONTACT.email)
    .replaceAll("{memberArea}", BRAND.memberArea)
    .replaceAll("{unsubscribe}", unsubscribeUrl(to.email));
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderEmail(
  template: EmailTemplate,
  to: EmailRecipient,
): { subject: string; html: string; text: string } {
  const subject = fill(template.subject, to);
  const paragraphs = template.body.map((line) => fill(line, to));
  const action = template.action
    ? { label: fill(template.action.label, to), url: fill(template.action.url, to) }
    : null;
  const unsubscribe = unsubscribeUrl(to.email);

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:${COLOR.paper};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLOR.paper};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ${COLOR.border};border-radius:2px;">

  <!-- The lockup, on the dark ground where the pale blue is legible. -->
  <tr><td style="background:${COLOR.ground};padding:36px 32px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="font-family:${SERIF};font-size:40px;line-height:1;color:${COLOR.paleBlue};">${BRAND.markShort}</td>
      <td align="right" style="font-family:${SERIF};font-style:italic;font-size:14px;color:rgba(242,240,236,0.7);">${BRAND.endorsement}</td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:36px 32px 8px;">
    ${paragraphs
      .map(
        (p) =>
          `<p style="margin:0 0 18px;font-family:${SANS};font-size:16px;line-height:1.65;color:${COLOR.ink};">${escapeHtml(p)}</p>`,
      )
      .join("\n    ")}
  </td></tr>

  ${
    action
      ? `<tr><td style="padding:8px 32px 36px;">
    <a href="${escapeHtml(action.url)}" style="display:inline-block;background:${COLOR.accent};color:#ffffff;text-decoration:none;font-family:${SANS};font-size:16px;padding:14px 28px;border-radius:2px;">${escapeHtml(action.label)}</a>
  </td></tr>`
      : `<tr><td style="padding:0 32px 28px;"></td></tr>`
  }

  <tr><td style="padding:22px 32px 28px;border-top:1px solid ${COLOR.border};">
    ${EMAIL_FOOTER.lines
      .map(
        (line) =>
          `<p style="margin:0 0 4px;font-family:${SANS};font-size:12px;line-height:1.6;color:${COLOR.inkMuted};">${escapeHtml(fill(line, to))}</p>`,
      )
      .join("\n    ")}
    <p style="margin:12px 0 0;font-family:${SANS};font-size:12px;">
      <a href="${escapeHtml(unsubscribe)}" style="color:${COLOR.inkMuted};">${escapeHtml(EMAIL_FOOTER.unsubscribeLabel)}</a>
    </p>
  </td></tr>

</table></td></tr></table></body></html>`;

  // A plain-text version, because some people read email that way and because
  // sending HTML alone makes a message more likely to be treated as spam.
  const text = [
    ...paragraphs,
    ...(action ? [`${action.label}: ${action.url}`] : []),
    "",
    ...EMAIL_FOOTER.lines.map((line) => fill(line, to)),
    `${EMAIL_FOOTER.unsubscribeLabel}: ${unsubscribe}`,
  ].join("\n\n");

  return { subject, html, text };
}

export type SendResult =
  | { sent: true }
  | { sent: false; configured: false; reason: string }
  | { sent: false; configured: true; reason: string };

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail(
  template: EmailTemplate,
  to: EmailRecipient,
): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!key || !from) {
    return {
      sent: false,
      configured: false,
      reason: "RESEND_API_KEY or EMAIL_FROM is not set",
    };
  }

  const { subject, html, text } = renderEmail(template, to);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to.email],
        /*
         * REPLIES GO SOMEWHERE A PERSON READS, not back to the sending
         * address. Email has to be sent from a domain Resend has verified,
         * which is the fwd. subdomain; the address the site publishes and that
         * somebody actually watches is CONTACT.email. Without this, hitting
         * reply on a welcome or a decline would send it into a subdomain
         * inbox nobody has opened.
         */
        reply_to: CONTACT.email,
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (response.ok) return { sent: true };
    return {
      sent: false,
      configured: true,
      reason: `${response.status} ${(await response.text()).slice(0, 300)}`,
    };
  } catch (error) {
    return {
      sent: false,
      configured: true,
      reason: error instanceof Error ? error.message : "unknown network error",
    };
  }
}
