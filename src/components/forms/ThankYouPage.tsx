import React, { useEffect } from 'react';
import { FormData } from '@/lib/types';
import { CalendarIntegration } from './CalendarIntegration';
import { BUSINESS_CONFIG } from '@/lib/config';

// Declare dataLayer type
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

interface ThankYouPageProps {
  formData: FormData;
}

export const ThankYouPage = ({ formData }: ThankYouPageProps) => {
  const { patientInfo, appointmentSlot, selectedLocation } = formData;

  useEffect(() => {
    // Push appointment scheduled event to data layer
    window.dataLayer?.push({
      event: 'appointment_scheduled',
      appointment_details: {
        patient_name: `${patientInfo.firstName} ${patientInfo.lastName}`,
        appointment_date: new Date(appointmentSlot.startTime).toLocaleDateString(),
        appointment_time: `${formatTime(appointmentSlot.startTime)} - ${formatTime(appointmentSlot.endTime)}`,
        location_name: selectedLocation?.name,
        location_address: selectedLocation?.address,
        patient_email: patientInfo.email
      }
    });
  }, []); // Empty dependency array since we only want to fire this once when component mounts

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const googleMapSrc = selectedLocation?.lat && selectedLocation?.lng
    ? `https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}&z=15&output=embed`
    : undefined;

  return (
    <div className="text-center">
      <div className="mb-8">
        <svg
          className="mx-auto h-12 w-12 text-[#159A00]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Appointment Scheduled Successfully!
        </h2>
        <p className="mt-2 text-gray-600">
          Thank you for scheduling your appointment!
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Details</h3>
        <div className="text-left space-y-2">
          <p><span className="font-medium">Name:</span> {patientInfo.firstName} {patientInfo.lastName}</p>
          <p><span className="font-medium">Date:</span> {new Date(appointmentSlot.startTime).toLocaleDateString()}</p>
          <p><span className="font-medium">Time:</span> {formatTime(appointmentSlot.startTime)} - {formatTime(appointmentSlot.endTime)}</p>
          <p><span className="font-medium">Location:</span> {selectedLocation?.name}</p>
          <p><span className="font-medium">Address:</span> {selectedLocation?.address}</p>
          {selectedLocation?.phone && (
            <p>
              <span className="font-medium">Phone:</span>{' '}
              <a 
                href={`tel:${selectedLocation.phone}`}
                className="text-[#159A00] hover:text-[#159A00]/80 transition-colors"
              >
                {selectedLocation.phone}
              </a>
            </p>
          )}
        </div>
      </div>

      <CalendarIntegration
        appointmentSlot={appointmentSlot}
        location={selectedLocation!}
        patientInfo={patientInfo}
      />

      {googleMapSrc && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Location Map</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              title="Google Map"
              width="100%"
              height="350"
              className="rounded-lg border shadow"
              src={googleMapSrc}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-500">
        <p>A confirmation email has been sent to {patientInfo.email}</p>
        <p className="mt-2">Please check your inbox (and spam folder) for the confirmation email.</p>
        <p className="mt-2">
          If you need to make any changes, please contact {BUSINESS_CONFIG.BUSINESS_NAME} at{' '}
          <a 
            href={`mailto:${BUSINESS_CONFIG.EMAIL_CONFIG.CONTACT_EMAIL}`}
            className="text-[#159A00] hover:text-[#159A00]/80 transition-colors"
          >
            {BUSINESS_CONFIG.EMAIL_CONFIG.CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
}; 