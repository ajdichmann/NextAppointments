# Business Configuration Variables

This project now includes global business configuration variables that can be easily customized for your business needs.

## Configuration File

The main configuration is located in `src/lib/config.ts`. This file contains all the global business variables that are used throughout the application.

## Available Variables

### Core Business Information
- `BUSINESS_NAME`: Your business name (used in titles, emails, and UI)
- `LOGO_URL`: Path to your business logo (used in the header)

### Email Configuration
- `EMAIL_CONFIG.FROM_EMAIL`: Email address used as sender for automated emails
- `EMAIL_CONFIG.REPLY_TO_EMAIL`: Email address for replies to automated emails
- `EMAIL_CONFIG.SUPPORT_EMAIL`: Email address for support inquiries
- `EMAIL_CONFIG.CONTACT_EMAIL`: General contact email address

### Additional Business Information
- `PHONE`: Business phone number
- `WEBSITE`: Business website URL
- `ADDRESS`: Business address

### Social Media (Optional)
- `FACEBOOK`: Facebook page URL
- `INSTAGRAM`: Instagram profile URL
- `TWITTER`: Twitter profile URL

## How to Customize

1. **Update Business Information**: Edit the values in `src/lib/config.ts`:
   ```typescript
   export const BUSINESS_CONFIG = {
     BUSINESS_NAME: 'Your Actual Business Name',
     LOGO_URL: '/your-logo.png', // Place your logo in the public folder
     EMAIL_CONFIG: {
       FROM_EMAIL: 'noreply@yourbusiness.com',
       REPLY_TO_EMAIL: 'contact@yourbusiness.com',
       SUPPORT_EMAIL: 'support@yourbusiness.com',
       CONTACT_EMAIL: 'contact@yourbusiness.com',
     },
     // ... other variables
   } as const;
   ```

2. **Add Your Logo**: Place your logo file in the `public/` directory and update the `LOGO_URL` path accordingly.

3. **Update Contact Information**: Modify the contact details to match your business information.

## Where These Variables Are Used

The business configuration variables are automatically used in:

### 1. **Page Layout** (`src/app/layout.tsx`)
- Page title and meta description

### 2. **Main Page** (`src/app/page.tsx`)
- Header logo and business name in the appointment scheduler

### 3. **Thank You Page** (`src/components/forms/ThankYouPage.tsx`)
- Contact information for customer support

### 4. **Email Templates** (`src/lib/resend.ts`)
- Email sender address
- Email subject lines
- Email footer information

## Helper Functions

The configuration file also includes helper functions for easy access:
- `getBusinessName()`: Returns the business name
- `getContactEmail()`: Returns the contact email
- `getLogoUrl()`: Returns the logo URL

## Type Safety

The configuration is typed with TypeScript, so you'll get autocomplete and type checking when using these variables throughout your codebase.

## Example Usage

```typescript
import { BUSINESS_CONFIG, getBusinessName } from '@/lib/config';

// Use the config object directly
const businessName = BUSINESS_CONFIG.BUSINESS_NAME;

// Or use helper functions
const name = getBusinessName();
```

## Environment Variables

For sensitive information like API keys, continue using environment variables. The business configuration is for public-facing information that should be consistent across your application.

## Benefits

- **Centralized Configuration**: All business information in one place
- **Easy Updates**: Change business details without searching through multiple files
- **Consistency**: Ensures the same business information is used everywhere
- **Type Safety**: TypeScript provides autocomplete and error checking
- **Maintainability**: Easy to maintain and update business information 