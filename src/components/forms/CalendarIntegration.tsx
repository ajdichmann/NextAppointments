import { AppointmentSlot, Location } from '@/lib/types';

interface CalendarIntegrationProps {
  appointmentSlot: AppointmentSlot;
  location: Location;
  patientInfo: {
    firstName: string;
    lastName: string;
  };
}

export const CalendarIntegration = ({ appointmentSlot, location, patientInfo }: CalendarIntegrationProps) => {
  const generateGoogleCalendarLink = () => {
    const startTime = new Date(appointmentSlot.startTime);
    const endTime = new Date(appointmentSlot.endTime);
    
    const title = encodeURIComponent(`Appointment - ${patientInfo.firstName} ${patientInfo.lastName}`);
    const details = encodeURIComponent(`Appointment at ${location.name}\nAddress: ${location.address}`);
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startTime.toISOString().replace(/-|:|\.\d+/g, '')}/${endTime.toISOString().replace(/-|:|\.\d+/g, '')}`;
  };

  const generateOutlookCalendarLink = () => {
    const startTime = new Date(appointmentSlot.startTime);
    const endTime = new Date(appointmentSlot.endTime);
    
    const title = encodeURIComponent(`Appointment - ${patientInfo.firstName} ${patientInfo.lastName}`);
    const details = encodeURIComponent(`Appointment at ${location.name}\nAddress: ${location.address}`);
    
    return `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${title}&body=${details}&startdt=${startTime.toISOString()}&enddt=${endTime.toISOString()}`;
  };

  const generateICSFile = () => {
    const startTime = new Date(appointmentSlot.startTime);
    const endTime = new Date(appointmentSlot.endTime);
    const title = `Appointment - ${patientInfo.firstName} ${patientInfo.lastName}`;
    const description = `Appointment at ${location.name}\nAddress: ${location.address}`;
    
    // Format dates for ICS file
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NextAppointments//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(startTime)}`,
      `DTEND:${formatDate(endTime)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location.address}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // Create blob and download link
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `appointment-${formatDate(startTime)}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add to Calendar</h3>
      <div className="space-y-3">
        <a
          href={generateGoogleCalendarLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#159A00] hover:bg-[#128000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#159A00]"
        >
          Add to Google Calendar
        </a>
        <a
          href={generateOutlookCalendarLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0078D4] hover:bg-[#006CBE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0078D4]"
        >
          Add to Outlook Calendar
        </a>
        <button
          onClick={generateICSFile}
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6B7280] hover:bg-[#4B5563] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6B7280]"
        >
          Download .ics File
        </button>
      </div>
    </div>
  );
}; 