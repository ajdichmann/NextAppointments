import { NextRequest, NextResponse } from 'next/server';
import { sendAppointmentConfirmationEmail, EmailData } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      patientInfo, 
      appointmentSlot, 
      selectedLocation, 
      serviceType 
    } = body;

    // Validate required fields
    if (!patientInfo?.email || !patientInfo?.firstName || !patientInfo?.lastName) {
      return NextResponse.json(
        { error: 'Missing required patient information' },
        { status: 400 }
      );
    }

    if (!appointmentSlot?.startTime || !appointmentSlot?.endTime) {
      return NextResponse.json(
        { error: 'Missing appointment time information' },
        { status: 400 }
      );
    }

    if (!selectedLocation?.name || !selectedLocation?.address) {
      return NextResponse.json(
        { error: 'Missing location information' },
        { status: 400 }
      );
    }

    // Format the appointment data
    const emailData: EmailData = {
      to: patientInfo.email,
      patientName: `${patientInfo.firstName} ${patientInfo.lastName}`,
      appointmentDate: new Date(appointmentSlot.startTime).toLocaleDateString(),
      appointmentTime: `${formatTime(appointmentSlot.startTime)} - ${formatTime(appointmentSlot.endTime)}`,
      locationName: selectedLocation.name,
      locationAddress: selectedLocation.address,
      serviceType: serviceType || 'Appointment',
    };

    // Send the confirmation email
    await sendAppointmentConfirmationEmail(emailData);

    return NextResponse.json(
      { message: 'Confirmation email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in send-confirmation API:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation email' },
      { status: 500 }
    );
  }
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
} 