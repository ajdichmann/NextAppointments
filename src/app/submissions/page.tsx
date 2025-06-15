'use client';

import { SubmissionsList } from '@/components/forms/SubmissionsList';

export default function SubmissionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <img 
            src="https://placehold.co/325x70?text=Logo" 
            alt="Logo" 
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