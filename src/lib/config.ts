// Global business configuration variables
export const BUSINESS_CONFIG = {
  // Business Information
  BUSINESS_NAME: 'Your Business Name',
  CONTACT_EMAIL: 'contact@yourbusiness.com',
  
  // Assets
  LOGO_URL: '/logo.png', // Update this path to your actual logo file
  
  // Additional business information that might be useful
  PHONE: '+1 (555) 123-4567',
  WEBSITE: 'https://yourbusiness.com',
  ADDRESS: '123 Business Street, City, State 12345',
  
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