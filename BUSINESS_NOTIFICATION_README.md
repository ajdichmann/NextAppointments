# Business Notification Feature

## Overview

This feature adds automatic email notifications to the business whenever a new appointment is scheduled through the website. The business will receive a detailed notification email containing all the appointment and patient information.

## Configuration

### Email Settings

The business notification email is configured in `src/lib/config.ts`:

```typescript
EMAIL_CONFIG: {
  // ... other email settings
  BUSINESS_NOTIFICATION_EMAIL: 'appointments@nextappointments.net', // Email for business notifications
}
```

**Important**: Update the `BUSINESS_NOTIFICATION_EMAIL` to the actual email address where you want to receive appointment notifications.

## How It Works

1. **Patient Books Appointment**: When a patient completes the appointment booking process
2. **Dual Email Sending**: The system now sends two emails:
   - **Patient Confirmation**: Sent to the patient with their appointment details
   - **Business Notification**: Sent to the business email with patient and appointment information

## Email Content

### Business Notification Email Includes:

- **Patient Information**:
  - Full name
  - Email address (clickable)
  - Phone number (clickable, if provided)
  
- **Appointment Details**:
  - Service type
  - Date and time
  - Location name and address
  
- **Action Buttons**:
  - Reply to patient (opens email client)
  - Call patient (opens phone dialer)
  
- **Next Steps**: Suggestions for the business on what to do next

## Implementation Details

### Files Modified:

1. **`src/lib/config.ts`**: Added business notification email configuration
2. **`src/lib/resend.ts`**: Added new interface and functions for business notifications
3. **`src/app/api/send-confirmation/route.ts`**: Updated to send both emails

### New Functions:

- `sendBusinessNotificationEmail()`: Sends notification to business
- `generateBusinessNotificationHTML()`: Generates the HTML email template
- `BusinessNotificationData` interface: Defines the data structure

## Testing

To test the feature:

1. Ensure your `RESEND_API_KEY` environment variable is set
2. Update the `BUSINESS_NOTIFICATION_EMAIL` in config.ts to your email
3. Complete an appointment booking through the website
4. Check both the patient confirmation and business notification emails

## Customization

### Email Template

The business notification email template can be customized in the `generateBusinessNotificationHTML()` function in `src/lib/resend.ts`. The template includes:

- Professional styling with your brand colors
- Responsive design for mobile devices
- Clear sections for patient and appointment information
- Action buttons for quick communication

### Email Content

You can modify:
- Email subject line
- Header and footer text
- Next steps suggestions
- Styling and colors

## Environment Variables

Make sure these environment variables are set:

```bash
RESEND_API_KEY=your_resend_api_key_here
```

## Troubleshooting

### Common Issues:

1. **Emails not sending**: Check your Resend API key and email configuration
2. **Wrong email address**: Verify the `BUSINESS_NOTIFICATION_EMAIL` in config.ts
3. **Missing patient phone**: The phone field is optional, so notifications will work without it

### Error Handling:

The system includes comprehensive error handling:
- API errors are logged to the console
- Failed email sends don't break the appointment booking process
- Both emails are sent independently (if one fails, the other still sends)

## Future Enhancements

Potential improvements for this feature:

1. **SMS Notifications**: Add text message notifications
2. **Calendar Integration**: Direct calendar event creation
3. **Customizable Templates**: Admin interface to customize email content
4. **Notification Preferences**: Allow businesses to choose what notifications to receive
5. **Reminder Notifications**: Automatic reminder emails before appointments 