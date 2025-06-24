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

export interface BusinessNotificationData {
  patientName: string;
  patientEmail: string;
  patientPhone?: string;
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

function generateBusinessNotificationHTML(notificationData: BusinessNotificationData): string {
  const { patientName, patientEmail, patientPhone, appointmentDate, appointmentTime, locationName, locationAddress, serviceType } = notificationData;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Appointment Notification</title>
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
        .patient-details {
          background-color: #e8f5e8;
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
        .action-buttons {
          text-align: center;
          margin: 20px 0;
        }
        .action-button {
          display: inline-block;
          padding: 10px 20px;
          margin: 0 10px;
          background-color: #159A00;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Appointment Scheduled</h1>
        <p>A new appointment has been booked through your website</p>
      </div>
      
      <div class="content">
        <div class="patient-details">
          <h2>Patient Information</h2>
          <div class="detail-row">
            <span class="label">Name:</span> ${patientName}
          </div>
          <div class="detail-row">
            <span class="label">Email:</span> <a href="mailto:${patientEmail}">${patientEmail}</a>
          </div>
          ${patientPhone ? `<div class="detail-row">
            <span class="label">Phone:</span> <a href="tel:${patientPhone}">${patientPhone}</a>
          </div>` : ''}
        </div>
        
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
        
        <div class="action-buttons">
          <a href="mailto:${patientEmail}" class="action-button">Reply to Patient</a>
          <a href="tel:${patientPhone || ''}" class="action-button">Call Patient</a>
        </div>
        
        <p><strong>Next Steps:</strong></p>
        <ul>
          <li>Review the appointment details above</li>
          <li>Prepare any necessary documentation or materials</li>
          <li>Consider sending a follow-up email to confirm any special requirements</li>
          <li>Update your calendar system if needed</li>
        </ul>
        
        <p>This notification was automatically generated when the patient completed the booking process on your website.</p>
      </div>
      
      <div class="footer">
        <p>This is an automated notification from your appointment booking system.</p>
        <p>If you have any questions about this appointment, please check your booking system or contact your technical support.</p>
      </div>
    </body>
    </html>
  `;
}

export async function sendBusinessNotificationEmail(notificationData: BusinessNotificationData) {
  try {
    const { data, error } = await resend.emails.send({
      from: BUSINESS_CONFIG.EMAIL_CONFIG.FROM_EMAIL,
      to: [BUSINESS_CONFIG.EMAIL_CONFIG.BUSINESS_NOTIFICATION_EMAIL],
      subject: `New Appointment Scheduled - ${notificationData.patientName}`,
      html: generateBusinessNotificationHTML(notificationData),
      replyTo: BUSINESS_CONFIG.EMAIL_CONFIG.REPLY_TO_EMAIL,
    });

    if (error) {
      console.error('Error sending business notification:', error);
      throw new Error('Failed to send business notification email');
    }

    return data;
  } catch (error) {
    console.error('Error in sendBusinessNotificationEmail:', error);
    throw error;
  }
} 