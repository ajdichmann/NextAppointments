import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../common/Button';
import { PatientInfo } from '@/lib/types';

const patientInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => val.replace(/\D/g, '').length === 10, {
      message: 'Phone number must be 10 digits'
    }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
});

type PatientInfoFormData = z.infer<typeof patientInfoSchema>;

interface PatientInfoFormProps {
  onSubmit: (patientInfo: PatientInfo) => void;
  onBack: () => void;
}

export function PatientInfoForm({ onSubmit, onBack }: PatientInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientInfoFormData>({
    resolver: zodResolver(patientInfoSchema),
  });

  const onSubmitForm = (data: PatientInfoFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            {...register('firstName')}
            type="text"
            id="firstName"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#159A00] focus:ring-[#159A00] sm:text-sm ${
              errors.firstName ? 'border-red-500' : ''
            }`}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            {...register('lastName')}
            type="text"
            id="lastName"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#159A00] focus:ring-[#159A00] sm:text-sm ${
              errors.lastName ? 'border-red-500' : ''
            }`}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#159A00] focus:ring-[#159A00] sm:text-sm ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            placeholder="(123) 456-7890"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#159A00] focus:ring-[#159A00] sm:text-sm ${
              errors.phone ? 'border-red-500' : ''
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            {...register('dateOfBirth')}
            type="date"
            id="dateOfBirth"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#159A00] focus:ring-[#159A00] sm:text-sm ${
              errors.dateOfBirth ? 'border-red-500' : ''
            }`}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} type="button">
          Back
        </Button>
        <Button type="submit">See Available Appointment Times</Button>
      </div>
    </form>
  );
} 