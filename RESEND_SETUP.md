# Resend Email Integration Setup

This guide explains how to set up the Resend email integration for appointment confirmations.

## Prerequisites

1. A Resend account (sign up at [resend.com](https://resend.com))
2. A verified domain in Resend
3. A Resend API key

## Setup Instructions

### 1. Get Your Resend API Key

1. Log in to your Resend dashboard
2. Go to the API Keys section
3. Create a new API key
4. Copy the API key (it starts with `re_`)

### 2. Configure Environment Variables

1. Create a `.env.local` file in the root directory
2. Add your Resend API key to the environment variables

Example `.env.local`:
```
# Resend API Configuration
RESEND_API_KEY=re_1234567890abcdef...
```

### 3. Configure Email Settings in Config File

Update the email configuration in `src/lib/config.ts`:

```typescript
export const BUSINESS_CONFIG = {
  // ... other config
  EMAIL_CONFIG: {
    FROM_EMAIL: 'noreply@yourdomain.com', // Use your verified domain
    REPLY_TO_EMAIL: 'contact@yourdomain.com',
    SUPPORT_EMAIL: 'support@yourdomain.com',
  },
  // ... other config
} as const;
```

**Important**: The `FROM_EMAIL` must match your verified domain in Resend.

### 4. Verify Your Domain in Resend

1. In your Resend dashboard, go to Domains
2. Add and verify your domain
3. Follow the DNS configuration instructions provided by Resend
4. Wait for domain verification (usually takes a few minutes)

### 5. Test the Integration

1. Start your development server: `npm run dev`
2. Complete the appointment booking process
3. Check that the confirmation email is sent to the provided email address

## Features

- **Professional Email Template**: Beautiful HTML email with appointment details
- **Error Handling**: Graceful fallback if email sending fails
- **Centralized Configuration**: Email settings managed in config file
- **Type Safety**: Full TypeScript support

## Email Template

The confirmation email includes:
- Patient name and appointment details
- Date, time, and location information
- Service type
- Important reminders
- Professional styling with your brand colors

## Troubleshooting

### Email Not Sending
1. Check that your Resend API key is correct in `.env.local`
2. Verify your domain is properly configured in Resend
3. Check that the `FROM_EMAIL` in config matches your verified domain
4. Check the browser console for any error messages

### Email Going to Spam
1. Ensure your domain has proper SPF and DKIM records
2. Use a professional "from" email address
3. Include proper email headers and formatting

### API Errors
1. Check the server logs for detailed error messages
2. Verify all required fields are being sent to the API
3. Ensure the Resend API key has proper permissions

## Security Notes

- Never commit your `.env.local` file to version control
- The API key is only used server-side and never exposed to the client
- All email sending is handled through secure API calls
- Email configuration is centralized in the config file for easy management 