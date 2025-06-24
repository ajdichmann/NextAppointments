// Global business configuration variables
export const BUSINESS_CONFIG = {
  // Business Information
  BUSINESS_NAME: 'NextAppointments',
  CONTACT_EMAIL: 'contact@nextappointments.net',
  
  // Assets
  LOGO_URL: '/logo.png', // Update this path to your actual logo file
  WEBSITE: 'https://nextappointments.net/',
  
  // Email Configuration
  EMAIL_CONFIG: {
    FROM_EMAIL: 'contact@nextappointments.net',
    REPLY_TO_EMAIL: 'contact@nextappointments.net',
    SUPPORT_EMAIL: 'support@nextappointments.net',
  },
  
  // Social Media (optional)
  FACEBOOK: 'https://facebook.com/yourbusiness',
  INSTAGRAM: 'https://instagram.com/yourbusiness',
  TWITTER: 'https://twitter.com/yourbusiness',
} as const;

// Type for the business config
export type BusinessConfig = typeof BUSINESS_CONFIG;

// Helper function to get business name
export const getBusinessName = (): string => BUSINESS_CONFIG.BUSINESS_NAME;

// Helper function to get contact email
export const getContactEmail = (): string => BUSINESS_CONFIG.CONTACT_EMAIL;

// Helper function to get logo URL
export const getLogoUrl = (): string => BUSINESS_CONFIG.LOGO_URL;

// Helper function to get from email
export const getFromEmail = (): string => BUSINESS_CONFIG.EMAIL_CONFIG.FROM_EMAIL; 