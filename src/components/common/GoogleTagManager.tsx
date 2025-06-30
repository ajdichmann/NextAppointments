'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { BUSINESS_CONFIG } from '@/lib/config';

interface GoogleTagManagerProps {
  containerId?: string;
}

export default function GoogleTagManager({ 
  containerId = BUSINESS_CONFIG.GTM.CONTAINER_ID 
}: GoogleTagManagerProps) {
  // Initialize dataLayer
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize dataLayer if it doesn't exist
      if (!window.dataLayer) {
        window.dataLayer = [];
      }
      
      window.gtag = function() {
        window.dataLayer?.push(arguments);
      };
      
      // Initialize gtag
      window.gtag?.('js', new Date());
      window.gtag?.('config', containerId);
    }
  }, [containerId]);

  // Don't render if GTM is disabled
  if (!BUSINESS_CONFIG.GTM.ENABLED) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${containerId}');
          `,
        }}
      />
    </>
  );
}

// Helper function to push events to dataLayer
export const pushToDataLayer = (event: string, data?: any) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data,
    });
  }
};

// Helper function to track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    pushToDataLayer('page_view', {
      page_location: url,
      page_title: document.title,
    });
  }
};

// Helper function to track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  pushToDataLayer(eventName, parameters);
}; 