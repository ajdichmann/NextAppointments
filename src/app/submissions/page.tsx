'use client';

import { useEffect } from 'react';
import { SubmissionsList } from '@/components/forms/SubmissionsList';
import { BUSINESS_CONFIG } from '@/lib/config';
import { trackPageView } from '@/components/common/GoogleTagManager';

export default function SubmissionsPage() {
  // Track page view on component mount
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <img 
            src={BUSINESS_CONFIG.LOGO_URL} 
            alt={`${BUSINESS_CONFIG.BUSINESS_NAME} Logo`} 
            className="mx-auto mb-6 h-16 w-auto"
          />
          <h1 className="text-3xl font-bold text-gray-900">Scheduled Appointments</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage your scheduled appointments.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <SubmissionsList />
        </div>
      </div>
    </div>
  );
} 