import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    
    let fullName = '';
    let email = '';
    let phone = '';
    let company = '';
    let service = '';
    let turnaround = '';
    let format = '';
    let subject = '';
    let message = '';
    let sourcePage = 'Website Contact Form';
    let attachments: Array<{ filename: string; content: Buffer; contentType?: string }> = [];

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      fullName = (formData.get('fullName') || formData.get('name') || '') as string;
      email = (formData.get('email') || '') as string;
      phone = (formData.get('phone') || formData.get('contact') || '') as string;
      company = (formData.get('company') || '') as string;
      service = (formData.get('service') || '') as string;
      turnaround = (formData.get('turnaround') || '') as string;
      format = (formData.get('format') || '') as string;
      subject = (formData.get('subject') || '') as string;
      message = (formData.get('message') || formData.get('description') || '') as string;
      sourcePage = (formData.get('sourcePage') || sourcePage) as string;

      const file = formData.get('file') as File | null;
      if (file && typeof file === 'object' && file.size > 0 && file.name) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type || undefined,
        });
      }
    } else {
      const body = await req.json();
      fullName = body.fullName || body.name || '';
      email = body.email || '';
      phone = body.phone || body.contact || '';
      company = body.company || '';
      service = body.service || '';
      turnaround = body.turnaround || '';
      format = body.format || '';
      subject = body.subject || '';
      message = body.message || body.description || '';
      sourcePage = body.sourcePage || sourcePage;
    }

    if (!email && !phone && !fullName) {
      return NextResponse.json(
        { success: false, error: 'Please provide at least your contact details.' },
        { status: 400 }
      );
    }

    const emailSubject = subject?.trim()
      ? `[NewLeaf Inquiry] ${subject}`
      : `[NewLeaf Inquiry] New Message from ${fullName || email || 'Customer'}`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #065f46 0%, #047857 100%); padding: 24px 30px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">New Inquiry Received</h2>
          <p style="margin: 6px 0 0; font-size: 13px; color: #a7f3d0;">Origin: ${sourcePage}</p>
        </div>

        <div style="padding: 24px 30px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tbody>
              ${fullName ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 35%; font-weight: 600;">Full Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700;">${fullName}</td>
              </tr>` : ''}

              ${email ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #059669; font-weight: 600;">
                  <a href="mailto:${email}" style="color: #059669; text-decoration: none;">${email}</a>
                </td>
              </tr>` : ''}

              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Phone / WhatsApp:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">
                  <a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a>
                </td>
              </tr>` : ''}

              ${company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Company / Brand:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${company}</td>
              </tr>` : ''}

              ${service ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Service Required:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${service}</td>
              </tr>` : ''}

              ${turnaround ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Turnaround Speed:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${turnaround}</td>
              </tr>` : ''}

              ${format ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Machine Format:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${format}</td>
              </tr>` : ''}
            </tbody>
          </table>

          ${message ? `
          <div style="margin-top: 20px;">
            <p style="color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Message / Stitch Details:</p>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>` : ''}

          ${attachments.length > 0 ? `
          <div style="margin-top: 16px; font-size: 12px; color: #64748b;">
            📎 <strong>Attachment:</strong> ${attachments.map(a => a.filename).join(', ')} (attached to this email)
          </div>` : ''}
        </div>

        <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 30px; font-size: 12px; color: #94a3b8; text-align: center;">
          Sent automatically from NewLeaf Skills Website Contact System.
        </div>
      </div>
    `;

    const plainText = `
New Inquiry Received from ${sourcePage}
----------------------------------------
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Company: ${company}
Service: ${service}
Turnaround: ${turnaround}
Format: ${format}
Subject: ${subject}

Message:
${message}
    `;

    const result = await sendEmail({
      replyTo: email || undefined,
      subject: emailSubject,
      text: plainText,
      html: htmlContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send mail' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully!',
      messageId: result.messageId,
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

