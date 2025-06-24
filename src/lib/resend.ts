import { Resend } from 'resend';
import { BUSINESS_CONFIG } from './config';

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailData {
  to: string;
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  locationName: string;
  locationAddress: string;
  serviceType: string;
}

export async function sendAppointmentConfirmationEmail(emailData: EmailData) {
  try {
    const { data, error } = await resend.emails.send({
      from: BUSINESS_CONFIG.EMAIL_CONFIG.FROM_EMAIL,
      to: [emailData.to],
      subject: `Appointment Confirmation - ${BUSINESS_CONFIG.BUSINESS_NAME}`,
      html: generateEmailHTML(emailData),
      replyTo: BUSINESS_CONFIG.EMAIL_CONFIG.REPLY_TO_EMAIL,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send confirmation email');
    }

    return data;
  } catch (error) {
    console.error('Error in sendAppointmentConfirmationEmail:', error);
    throw error;
  }
}

function generateEmailHTML(emailData: EmailData): string {
  const { patientName, appointmentDate, appointmentTime, locationName, locationAddress, serviceType } = emailData;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #159A00;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 0 0 8px 8px;
        }
        .appointment-details {
          background-color: white;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          border-left: 4px solid #159A00;
        }
        .detail-row {
          margin: 10px 0;
        }
        .label {
          font-weight: bold;
          color: #555;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Appointment Confirmation</h1>
        <p>Your appointment has been successfully scheduled!</p>
      </div>
      
      <div class="content">
        <p>Dear ${patientName},</p>
        
        <p>Thank you for scheduling your appointment with us. We're looking forward to seeing you!</p>
        
        <div class="appointment-details">
          <h2>Appointment Details</h2>
          <div class="detail-row">
            <span class="label">Service Type:</span> ${serviceType}
          </div>
          <div class="detail-row">
            <span class="label">Date:</span> ${appointmentDate}
          </div>
          <div class="detail-row">
            <span class="label">Time:</span> ${appointmentTime}
          </div>
          <div class="detail-row">
            <span class="label">Location:</span> ${locationName}
          </div>
          <div class="detail-row">
            <span class="label">Address:</span> ${locationAddress}
          </div>
        </div>
        
        <p><strong>Important Reminders:</strong></p>
        <ul>
          <li>Please arrive 10-15 minutes before your scheduled appointment time</li>
          <li>Bring a valid photo ID and your insurance card (if applicable)</li>
          <li>If you need to reschedule or cancel, please contact us at least 24 hours in advance</li>
        </ul>
        
        <p>If you have any questions or need to make changes to your appointment, please don't hesitate to contact us.</p>
        
        <p>Best regards,<br>The {BUSINESS_CONFIG.BUSINESS_NAME} Team</p>
      </div>
      
      <div class="footer">
        <p>This is an automated confirmation email. Please do not reply to this message.</p>
        <p>If you have any questions, please contact us at {BUSINESS_CONFIG.EMAIL_CONFIG.CONTACT_EMAIL}</p>
      </div>
    </body>
    </html>
  `;
} 