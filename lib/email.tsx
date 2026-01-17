// Email notification templates and utilities for Coding Sprout
// This can be integrated with Resend, SendGrid, or other email providers

export interface EmailData {
  to: string
  subject: string
  html: string
}

// Welcome email when user creates an account
export function getWelcomeEmailHtml(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #1A3A5C; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .logo { color: #4CAF50; font-size: 24px; font-weight: bold; }
        .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
        .button { display: inline-block; background: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🌱 Coding Sprout</div>
        </div>
        <div class="content">
          <h2>Welcome to Coding Sprout, ${name}!</h2>
          <p>Thank you for creating an account with us. We're excited to help your child develop valuable coding and problem-solving skills!</p>
          <p>Here's what you can do next:</p>
          <ul>
            <li>Add your child's profile to your account</li>
            <li>Browse our available classes</li>
            <li>Register for upcoming sessions</li>
          </ul>
          <p>We accept both credit card payments and charter school funds.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/classes" class="button">Browse Classes</a>
        </div>
        <div class="footer">
          <p>Coding Sprout - Helping Kids Grow Into Confident Coders</p>
          <p>Questions? Contact us at support@codingsprout.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Class registration confirmation email
export function getRegistrationConfirmationHtml(data: {
  parentName: string
  studentName: string
  className: string
  classDate: string
  classTime: string
  classType: string
  location?: string
  zoomLink?: string
  isOneOnOne: boolean
  amountPaid: number
}): string {
  const locationInfo =
    data.classType === "online"
      ? `<p><strong>Location:</strong> Online via Zoom</p>
       ${data.zoomLink ? `<p><strong>Zoom Link:</strong> <a href="${data.zoomLink}">${data.zoomLink}</a></p>` : "<p><em>Zoom link will be sent before class</em></p>"}`
      : `<p><strong>Location:</strong> ${data.location || "In-Person"}</p>`

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #1A3A5C; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; background: #4CAF50; color: white; border-radius: 8px 8px 0 0; }
        .logo { font-size: 24px; font-weight: bold; }
        .content { background: #f9fafb; padding: 30px; }
        .class-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4CAF50; }
        .badge { display: inline-block; background: #87CEEB; color: #1A3A5C; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
        .amount { font-size: 24px; font-weight: bold; color: #4CAF50; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; background: #f9fafb; border-radius: 0 0 8px 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🌱 Coding Sprout</div>
          <p>Registration Confirmed!</p>
        </div>
        <div class="content">
          <h2>Hello ${data.parentName},</h2>
          <p>Great news! ${data.studentName} has been successfully enrolled in the following class:</p>
          
          <div class="class-details">
            <h3>${data.className}</h3>
            ${data.isOneOnOne ? '<span class="badge">One-on-One Session</span>' : ""}
            <p><strong>Date:</strong> ${data.classDate}</p>
            <p><strong>Time:</strong> ${data.classTime}</p>
            ${locationInfo}
            <p><strong>Amount Paid:</strong> <span class="amount">$${data.amountPaid.toFixed(2)}</span></p>
          </div>
          
          <h3>What to Expect:</h3>
          <ul>
            <li>You'll receive a reminder email 24 hours before class</li>
            ${data.classType === "online" ? "<li>Make sure you have Zoom installed and ready</li>" : "<li>Please arrive 5-10 minutes early</li>"}
            <li>Your child should have a computer ready for coding exercises</li>
          </ul>
          
          <p>You can view all your enrollments in your dashboard.</p>
        </div>
        <div class="footer">
          <p>Coding Sprout - Helping Kids Grow Into Confident Coders</p>
          <p>Questions? Contact us at support@codingsprout.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Payment received email
export function getPaymentReceivedHtml(data: {
  parentName: string
  amount: number
  className: string
  paymentMethod: string
  transactionId?: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #1A3A5C; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .logo { color: #4CAF50; font-size: 24px; font-weight: bold; }
        .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
        .receipt { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .amount { font-size: 32px; font-weight: bold; color: #4CAF50; text-align: center; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🌱 Coding Sprout</div>
        </div>
        <div class="content">
          <h2>Payment Received</h2>
          <p>Hello ${data.parentName},</p>
          <p>We've received your payment. Thank you!</p>
          
          <div class="receipt">
            <p class="amount">$${data.amount.toFixed(2)}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p><strong>Class:</strong> ${data.className}</p>
            <p><strong>Payment Method:</strong> ${data.paymentMethod === "stripe" ? "Credit/Debit Card" : "Charter School Funds"}</p>
            ${data.transactionId ? `<p><strong>Transaction ID:</strong> ${data.transactionId}</p>` : ""}
            <p><strong>Date:</strong> ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          
          <p>This email serves as your receipt. Please keep it for your records.</p>
        </div>
        <div class="footer">
          <p>Coding Sprout - Helping Kids Grow Into Confident Coders</p>
          <p>Questions about your payment? Contact us at support@codingsprout.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Charter school pending approval email
export function getCharterPendingHtml(data: {
  parentName: string
  studentName: string
  className: string
  charterSchoolName: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #1A3A5C; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .logo { color: #4CAF50; font-size: 24px; font-weight: bold; }
        .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
        .status { background: #FFF8E1; padding: 20px; border-radius: 8px; border-left: 4px solid #FFC107; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🌱 Coding Sprout</div>
        </div>
        <div class="content">
          <h2>Registration Pending Approval</h2>
          <p>Hello ${data.parentName},</p>
          <p>We've received ${data.studentName}'s registration for <strong>${data.className}</strong>.</p>
          
          <div class="status">
            <h3>⏳ Awaiting Charter School Payment</h3>
            <p>We will be sending an invoice to <strong>${data.charterSchoolName}</strong> for processing.</p>
            <p>Once payment is confirmed, you'll receive a confirmation email with all the class details.</p>
          </div>
          
          <p>This process typically takes 3-5 business days. We'll keep you updated!</p>
        </div>
        <div class="footer">
          <p>Coding Sprout - Helping Kids Grow Into Confident Coders</p>
          <p>Questions? Contact us at support@codingsprout.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Utility function to send emails (integrate with your email provider)
export async function sendEmail(emailData: EmailData): Promise<boolean> {
  // TODO: Integrate with email provider (Resend, SendGrid, etc.)
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'Coding Sprout <noreply@codingsprout.com>',
  //   to: emailData.to,
  //   subject: emailData.subject,
  //   html: emailData.html
  // })

  console.log("Email would be sent:", {
    to: emailData.to,
    subject: emailData.subject,
  })

  return true
}
