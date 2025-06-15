import { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { AppointmentSlot, Location } from '@/lib/types';

interface AppointmentCalendarProps {
  selectedLocation: Location;
  onSubmit: (appointmentSlot: AppointmentSlot) => void;
  onBack: () => void;
}

// Generate time slots for a week
const generateWeekSlots = (startDate: Date, locationId: string, locationName: string) => {
  const slots: { [key: string]: AppointmentSlot[] } = {};
  const startHour = 8; // 8 AM
  const endHour = 17; // 5 PM

  // Generate slots for 7 days
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + dayOffset);
    const dateKey = currentDate.toISOString().split('T')[0];
    slots[dateKey] = [];

    for (let hour = startHour; hour < endHour; hour++) {
      // Add two slots per hour (30-minute intervals)
      for (let minute = 0; minute < 60; minute += 30) {
        const slotDate = new Date(currentDate);
        slotDate.setHours(hour, minute, 0, 0);
        
        const endDate = new Date(slotDate);
        endDate.setMinutes(endDate.getMinutes() + 30);

        slots[dateKey].push({
          id: `slot-${slotDate.toISOString()}`,
          startTime: slotDate.toISOString(),
          endTime: endDate.toISOString(),
          providerName: 'Dr. Smith',
          location: locationName,
          locationId: locationId,
        });
      }
    }
  }

  return slots;
};

export function AppointmentCalendar({ selectedLocation, onSubmit, onBack }: AppointmentCalendarProps) {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [weekSlots, setWeekSlots] = useState<{ [key: string]: AppointmentSlot[] }>({});
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null);

  useEffect(() => {
    if (startDate && selectedLocation) {
      const slots = generateWeekSlots(new Date(startDate), selectedLocation.id, selectedLocation.name);
      setWeekSlots(slots);
    }
  }, [startDate, selectedLocation]);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTimeSlots = () => {
    const firstDay = Object.keys(weekSlots)[0];
    return firstDay ? weekSlots[firstDay] : [];
  };

  const handleDateChange = (offset: number) => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + offset);
    setStartDate(newDate.toISOString().split('T')[0]);
  };

  // Helper to get the start of the current week (Sunday)
  const getStartOfCurrentWeek = () => {
    const now = new Date();
    const day = now.getDay(); // 0 (Sun) - 6 (Sat)
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    start.setDate(now.getDate() - day);
    return start;
  };

  // Helper to get the start of the displayed week
  const getStartOfDisplayedWeek = () => {
    const date = new Date(startDate);
    const day = date.getDay();
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    start.setDate(date.getDate() - day);
    return start;
  };

  const canGoToPreviousWeek = () => {
    const displayed = getStartOfDisplayedWeek();
    const current = getStartOfCurrentWeek();
    return displayed > current;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select an Appointment Time</h3>
        <p className="text-sm text-gray-600 mb-6">Selected Location: {selectedLocation.name}</p>

        <div className="flex items-center justify-between">
          {canGoToPreviousWeek() && (
            <Button variant="outline" onClick={() => handleDateChange(-7)}>
              Previous Week
            </Button>
          )}
          <h2 className="text-lg font-medium">
            Week of {formatDate(startDate)}
          </h2>
          <Button variant="outline" onClick={() => handleDateChange(7)}>
            Next Week
          </Button>
        </div>

        <div className="overflow-x-auto mt-6">
          <div className="min-w-[800px]">
            {/* Header row with dates */}
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="col-span-1"></div> {/* Time column header */}
              {Object.keys(weekSlots).map((date) => (
                <div
                  key={date}
                  className="text-center p-2 bg-[#159A00]/5 rounded-t-lg border-b border-[#159A00]/20"
                >
                  {formatDate(date)}
                </div>
              ))}
            </div>

            {/* Time slots grid */}
            {getTimeSlots().map((timeSlot, timeIndex) => (
              <div key={timeSlot.id} className="grid grid-cols-8 gap-1">
                {/* Time label */}
                <div className="col-span-1 p-2 text-sm text-gray-600 border-r">
                  {formatTime(timeSlot.startTime)}
                </div>

                {/* Time slots for each day */}
                {Object.keys(weekSlots).map((date) => {
                  const slot = weekSlots[date][timeIndex];
                  return (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 border rounded transition-colors duration-200 ${
                        selectedSlot?.id === slot.id
                          ? 'border-[#159A00] bg-[#159A00]/5'
                          : 'hover:border-[#159A00] hover:bg-[#159A00]/5'
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {formatTime(slot.startTime)}
                      </div>
                      <div className="text-xs text-gray-600">
                        {slot.providerName}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={() => selectedSlot && onSubmit(selectedSlot)}
          disabled={!selectedSlot}
        >
          Continue
        </Button>
      </div>
    </div>
  );
} 