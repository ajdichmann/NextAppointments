import { Button } from '../common/Button';
import { FormData } from '@/lib/types';

interface ReviewFormProps {
  formData: FormData;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function ReviewForm({ formData, onSubmit, onBack, isSubmitting }: ReviewFormProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Review Your Information</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Service Type</h3>
            <p className="mt-1 text-sm text-gray-900 capitalize">
              {formData.serviceType === 'regenerative-medicine' ? 'Regenerative Medicine' : formData.serviceType.replace('-', ' ')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Patient Information</h3>
            <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-500">Name</dt>
                <dd className="text-sm text-gray-900">
                  {formData.patientInfo.firstName} {formData.patientInfo.lastName}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900">{formData.patientInfo.email}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Phone</dt>
                <dd className="text-sm text-gray-900">{formData.patientInfo.phone}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Date of Birth</dt>
                <dd className="text-sm text-gray-900">{formData.patientInfo.dateOfBirth}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Appointment Details</h3>
            <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-500">Date</dt>
                <dd className="text-sm text-gray-900">
                  {formatDate(formData.appointmentSlot.startTime)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Time</dt>
                <dd className="text-sm text-gray-900">
                  {formatTime(formData.appointmentSlot.startTime)} - {formatTime(formData.appointmentSlot.endTime)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Provider</dt>
                <dd className="text-sm text-gray-900">{formData.appointmentSlot.providerName}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Location</dt>
                <dd className="text-sm text-gray-900">{formData.appointmentSlot.location}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
        </Button>
      </div>
    </div>
  );
} 