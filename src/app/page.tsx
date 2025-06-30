'use client';

import { useState, useEffect } from 'react';
import { PatientInfoForm } from '@/components/forms/PatientInfoForm';
import { AppointmentCalendar } from '@/components/forms/AppointmentCalendar';
import { ReviewForm } from '@/components/forms/ReviewForm';
import { ServiceTypeForm, ServiceType } from '@/components/forms/ServiceTypeForm';
import { LocationSelector } from '@/components/forms/LocationSelector';
import { AppointmentSlot, Location } from '@/lib/types';
import { storage } from '@/lib/storage';
import { ThankYouPage } from '@/components/forms/ThankYouPage';
import { BUSINESS_CONFIG } from '@/lib/config';
import { trackPageView } from '@/components/common/GoogleTagManager';

type FormData = {
  serviceType: ServiceType;
  patientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
  };
  appointmentSlot: AppointmentSlot;
  selectedLocation: Location | null;
};

export default function AppointmentScheduler() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceType: '' as ServiceType,
    patientInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
    },
    appointmentSlot: {} as AppointmentSlot,
    selectedLocation: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track page view on component mount
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  const handleServiceTypeSubmit = (serviceType: ServiceType) => {
    setFormData((prev) => ({ ...prev, serviceType }));
    setStep(2);
  };

  const handlePatientInfoSubmit = (patientInfo: FormData['patientInfo']) => {
    setFormData((prev) => ({ ...prev, patientInfo }));
    setStep(3);
  };

  const handleLocationSelect = (location: Location) => {
    setFormData((prev) => ({ ...prev, selectedLocation: location }));
    setStep(4);
  };

  const handleAppointmentSubmit = (appointmentSlot: AppointmentSlot) => {
    setFormData((prev) => ({ ...prev, appointmentSlot }));
    setStep(5);
  };

  const handleReviewSubmit = async () => {
    if (!formData.patientInfo || !formData.appointmentSlot) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Save to local storage
      const storedSubmission = storage.saveSubmission(formData);
      
      // Send confirmation email
      const emailResponse = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientInfo: formData.patientInfo,
          appointmentSlot: formData.appointmentSlot,
          selectedLocation: formData.selectedLocation,
          serviceType: formData.serviceType,
        }),
      });

      if (!emailResponse.ok) {
        console.warn('Failed to send confirmation email, but appointment was saved locally');
        // Don't throw error here - appointment is still saved locally
      }

      setStep(6);
    } catch (err: any) {
      setError('Failed to save appointment. Please try again.');
      console.error('Error saving appointment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <img 
            src={BUSINESS_CONFIG.LOGO_URL} 
            alt={`${BUSINESS_CONFIG.BUSINESS_NAME} Logo`} 
            className="mx-auto mb-6 h-16 w-auto"
          />
          <h1 className="text-3xl font-bold text-gray-900">Schedule an Appointment Online!</h1>
          <p className="mt-2 text-sm text-gray-600">
            Please fill out the form below to schedule your appointment with {BUSINESS_CONFIG.BUSINESS_NAME}.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex-1 h-1 ${
                    stepNumber <= step
                      ? 'bg-[#159A00]'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">Service Type</span>
              <span className="text-sm text-gray-600">Patient Info</span>
              <span className="text-sm text-gray-600">Location</span>
              <span className="text-sm text-gray-600">Time</span>
              <span className="text-sm text-gray-600">Review</span>
            </div>
          </div>

          {step === 1 && <ServiceTypeForm onSubmit={handleServiceTypeSubmit} />}
          {step === 2 && (
            <PatientInfoForm
              onSubmit={handlePatientInfoSubmit}
              onBack={handleBack}
            />
          )}
          {step === 3 && (
            <LocationSelector
              onLocationSelect={handleLocationSelect}
              selectedLocationId={formData.selectedLocation?.id}
              onBack={handleBack}
            />
          )}
          {step === 4 && formData.selectedLocation && (
            <AppointmentCalendar
              selectedLocation={formData.selectedLocation}
              onSubmit={handleAppointmentSubmit}
              onBack={handleBack}
            />
          )}
          {step === 5 && (
            <ReviewForm
              formData={formData}
              onSubmit={handleReviewSubmit}
              onBack={handleBack}
              isSubmitting={isSubmitting}
            />
          )}

          {step === 6 && formData.selectedLocation && (
            <ThankYouPage formData={formData} />
          )}
        </div>
      </div>
    </div>
  );
}
