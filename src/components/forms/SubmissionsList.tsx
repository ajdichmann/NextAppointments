import { useEffect, useState } from 'react';
import { storage, StoredSubmission } from '@/lib/storage';
import { Button } from '../common/Button';

export function SubmissionsList() {
  const [submissions, setSubmissions] = useState<StoredSubmission[]>([]);

  useEffect(() => {
    setSubmissions(storage.getSubmissions());
  }, []);

  const handleDelete = (id: string) => {
    storage.deleteSubmission(id);
    setSubmissions(storage.getSubmissions());
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No submissions found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Stored Submissions</h2>
        <Button
          variant="outline"
          onClick={() => {
            storage.clearSubmissions();
            setSubmissions([]);
          }}
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="bg-white shadow rounded-lg p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">
                  {submission.patientInfo.firstName} {submission.patientInfo.lastName}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDate(submission.submittedAt)}
                </p>
              </div>
              <Button
                variant="danger"
                onClick={() => handleDelete(submission.id)}
              >
                Delete
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Service Type</p>
                <p className="text-gray-900 capitalize">
                  {submission.serviceType.replace('-', ' ')}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="text-gray-900">{submission.patientInfo.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="text-gray-900">{submission.patientInfo.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Appointment Date</p>
                <p className="text-gray-900">
                  {new Date(submission.appointmentSlot.startTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 