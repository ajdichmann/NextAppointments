export interface PatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  zipCode: string;
  lat?: number;
  lng?: number;
  phone: string;
}

export interface AppointmentSlot {
  id: string;
  startTime: string;
  endTime: string;
  providerName: string;
  location: string;
  locationId: string;
}

export type ServiceType = 'option-1' | 'option-2' | 'option-3' | 'option-4';

export type FormData = {
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

export interface FormStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
} 