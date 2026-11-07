import nodemailer from 'nodemailer';

interface SendMailParams {
  to?: string;
  replyTo?: string;
  subject: string;
  text?: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content?: Buffer | string;
    path?: string;
    contentType?: string;
  }>;
}

export async function sendEmail({
  to,
  replyTo,
  subject,
  text,
  html,
  attachments,
}: SendMailParams) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const defaultReceiver = process.env.CONTACT_RECEIVER_EMAIL || user;

  if (!host || !user || !pass) {
    console.error('SMTP configuration missing: SMTP_HOST, SMTP_USER, or SMTP_PASS is not set in environment.');
    return {
      success: false,
      error: 'Email configuration is missing on the server.',
    };
  }

  // port 465 is typically secure (SSL), 587/25 is TLS
  const isSecure = port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: {
      user,
      pass,
    },
    tls: {
      // Allow self-signed or cPanel certificates if required
      rejectUnauthorized: false,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"NewLeaf Skills" <${user}>`,
      to: to || defaultReceiver,
      replyTo: replyTo || user,
      subject,
      text,
      html,
      attachments,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Error sending email via SMTP:', error);
    return {
      success: false,
      error: error?.message || 'Failed to send email',
    };
  }
}

