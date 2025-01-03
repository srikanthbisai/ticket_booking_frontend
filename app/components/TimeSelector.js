
"use client";
import { useState, useEffect } from 'react';

const TimeSelector = ({ selectedDate, onTimeSelect }) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Restaurant hours (24-hour format)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 22; hour++) {
      // Add slots for both :00 and :30 of each hour
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDate) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch existing bookings for the selected date
        const response = await fetch(`/api/bookings?date=${selectedDate}`);
        const bookedSlots = await response.json();
        
        // Generate all possible time slots
        const allSlots = generateTimeSlots();
        const bookedTimes = new Set(bookedSlots.map(booking => booking.time));
        
        const availableTimes = allSlots.map(time => ({
          time,
          available: !bookedTimes.has(time)
        }));
        
        setAvailableSlots(availableTimes);
      } catch (err) {
        setError('Failed to load available slots');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [selectedDate]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 mt-2">
      {availableSlots.map((slot) => (
        <button
          key={slot.time}
          onClick={() => onTimeSelect(slot.time)}
          disabled={!slot.available}
          className={`p-2 rounded text-sm ${
            slot.available
              ? 'bg-blue-50 hover:bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
};

export default TimeSelector;