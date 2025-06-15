import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { Location } from '@/lib/types';
import { Button } from '../common/Button';

const locationSchema = z.object({
  locationId: z.string({
    required_error: 'Please select a location',
  }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code').optional().or(z.literal('')),
});

type LocationFormData = z.infer<typeof locationSchema>;

// Mock locations data
const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Location 1',
    address: '123 Main St',
    zipCode: '75025',
    lat: 33.0198,
    lng: -96.6989,
    phone: '123-456-7890',
  },
  {
    id: '2',
    name: 'Location 2',
    address: '456 West Ave',
    zipCode: '77316',
    lat: 30.3119,
    lng: -95.4561,
    phone: '123-456-7890',
  },
  {
    id: '3',
    name: 'Location 3',
    address: '789 East Blvd',
    zipCode: '77316',
    lat: 30.1658,
    lng: -95.4613,
    phone: '123-456-7890',
  },
  {
    id: '4',
    name: 'Location 4',
    address: '321 North Rd',
    zipCode: '10004',
    lat: 40.7003,
    lng: -74.0122,
    phone: '123-456-7890',
  },
  {
    id: '5',
    name: 'Location 5',
    address: '654 South St',
    zipCode: '10005',
    lat: 40.7061,
    lng: -74.0087,
    phone: '123-456-7890',
  },
];

interface LocationSelectorProps {
  onLocationSelect: (location: Location) => void;
  selectedLocationId?: string;
  onBack: () => void;
}

// Haversine formula to calculate distance between two lat/lng points
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function LocationSelector({ onLocationSelect, selectedLocationId, onBack }: LocationSelectorProps) {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [geoError, setGeoError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      locationId: selectedLocationId || '',
      zipCode: '',
    },
  });

  const zipCode = watch('zipCode');

  useEffect(() => {
    if (selectedLocationId) {
      setValue('locationId', selectedLocationId);
    }
  }, [selectedLocationId, setValue]);

  // Handle geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const sorted = [...mockLocations].sort((a, b) => {
            if (a.lat && a.lng && b.lat && b.lng) {
              return (
                getDistance(latitude, longitude, a.lat, a.lng) -
                getDistance(latitude, longitude, b.lat, b.lng)
              );
            }
            return 0;
          });
          setLocations(sorted);
          setIsLoading(false);
        },
        (error) => {
          setGeoError('Unable to detect your location. Showing all locations.');
          setLocations(mockLocations);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setGeoError('Geolocation is not supported by your browser.');
      setLocations(mockLocations);
    }
  }, []);

  // Handle ZIP code search
  useEffect(() => {
    if (zipCode && zipCode.length === 5) {
      const filtered = mockLocations.filter(location => 
        location.zipCode.startsWith(zipCode)
      );
      setLocations(filtered.length > 0 ? filtered : mockLocations);
    } else if (!zipCode) {
      setLocations(mockLocations);
    }
  }, [zipCode]);

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setValue('zipCode', value);
  };

  const onSubmit = (data: LocationFormData) => {
    const selectedLocation = locations.find(l => l.id === data.locationId);
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select a Location</h3>
        {geoError && (
          <div className="mb-2 text-sm text-red-500">{geoError}</div>
        )}
        
        {/* Zip Code Input */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              {...register('zipCode')}
              type="text"
              placeholder="Enter ZIP code (optional)"
              onChange={handleZipCodeChange}
              className={`flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#159A00] focus:ring-[#159A00] sm:text-sm ${
                errors.zipCode ? 'border-red-500' : ''
              }`}
            />
          </div>
          {/* Only show error if zipCode is not empty and invalid */}
          {errors.zipCode && zipCode && (
            <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
          )}
        </div>

        {/* Location List */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {isLoading ? 'Loading locations...' : 'Locations Near You'}
          </h4>
          {locations.map((location) => (
            <button
              key={location.id}
              type="button"
              onClick={() => setValue('locationId', location.id)}
              className={`w-full p-4 text-left border rounded-lg transition-colors duration-200 ${
                watch('locationId') === location.id
                  ? 'border-[#159A00] bg-[#159A00]/5'
                  : 'border-gray-200 hover:border-[#159A00] hover:bg-[#159A00]/5'
              }`}
            >
              <h4 className="font-medium text-gray-900">{location.name}</h4>
              <p className="text-sm text-gray-600">{location.address}</p>
              <p className="text-sm text-gray-500">ZIP: {location.zipCode}</p>
            </button>
          ))}
          {locations.length === 0 && (
            <p className="text-sm text-gray-500">No locations found for this ZIP code.</p>
          )}
        </div>
        {errors.locationId && (
          <p className="mt-2 text-sm text-red-600">{errors.locationId.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} type="button">
          Back
        </Button>
        <Button type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
} 