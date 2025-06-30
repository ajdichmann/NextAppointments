# Google Tag Manager Setup Guide

This project now includes Google Tag Manager (GTM) support for tracking user interactions and analytics.

## Configuration

### 1. Environment Variables

Create a `.env.local` file in your project root and add the following variables:

```bash
# Google Tag Manager Configuration
# Replace GTM-XXXXXXX with your actual Google Tag Manager container ID
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXX

# Enable GTM in development (optional, defaults to production only)
# Set to 'true' to enable GTM in development environment
NEXT_PUBLIC_GTM_ENABLED=false
```

### 2. Get Your GTM Container ID

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new account or select an existing one
3. Create a new container for your website
4. Copy the Container ID (format: GTM-XXXXXXX)

## Features

### Automatic Tracking

The following events are automatically tracked:

- **Page Views**: Tracked on every page load
- **Appointment Scheduled**: Tracked when a user successfully schedules an appointment

### Manual Event Tracking

You can manually track custom events using the provided helper functions:

```typescript
import { trackEvent, trackPageView } from '@/components/common/GoogleTagManager';

// Track a custom event
trackEvent('button_click', {
  button_name: 'schedule_appointment',
  page_location: '/appointments'
});

// Track a page view
trackPageView('/appointments');
```

### Available Helper Functions

- `trackEvent(eventName, parameters?)`: Track custom events
- `trackPageView(url)`: Track page views
- `pushToDataLayer(event, data?)`: Push raw data to GTM data layer

## GTM Container Setup

### Recommended Tags

1. **Google Analytics 4 (GA4)**
   - Configure GA4 property
   - Set up conversion tracking for appointments

2. **Google Ads Conversion Tracking**
   - Track appointment bookings as conversions
   - Set up remarketing audiences

3. **Facebook Pixel** (if using Facebook Ads)
   - Track appointment bookings
   - Set up custom audiences

### Triggers

Set up triggers for the following events:
- `appointment_scheduled` - When users complete appointment booking
- `page_view` - For page view tracking

### Variables

The following data is available in GTM:
- `patient_name` - Full name of the patient
- `appointment_date` - Date of the appointment
- `appointment_time` - Time slot of the appointment
- `location_name` - Name of the selected location
- `location_address` - Address of the selected location
- `patient_email` - Email address of the patient

## Development vs Production

- **Development**: GTM is disabled by default unless `NEXT_PUBLIC_GTM_ENABLED=true`
- **Production**: GTM is enabled by default

## Testing

1. Use GTM Preview mode to test your tags
2. Check the browser console for dataLayer events
3. Verify events are firing in Google Analytics or other tracking tools

## Troubleshooting

### GTM Not Loading
- Check that `NEXT_PUBLIC_GTM_CONTAINER_ID` is set correctly
- Verify the container ID format (GTM-XXXXXXX)
- Check browser console for errors

### Events Not Firing
- Ensure GTM is enabled (`NEXT_PUBLIC_GTM_ENABLED=true` in development)
- Check that triggers are configured correctly in GTM
- Verify data layer events in browser console

### Data Not Appearing in Analytics
- Check GTM container publishing status
- Verify tag configurations
- Check for ad blockers or privacy extensions 