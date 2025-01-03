"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });
  const [error, setError] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]); // Store already booked slots
  const router = useRouter();

  // Fetch booked slots for a selected date
  const fetchBookedSlots = async (date) => {
    try {
      const response = await fetch(`/api/bookings?date=${date}`);
      if (!response.ok) {
        throw new Error("Failed to fetch booked slots");
      }
      const data = await response.json();
      setBookedSlots(data);
    } catch (err) {
      setError(err.message);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Fetch booked slots when the date changes
    if (name === "date") {
      setBookedSlots([]); // Clear previous slots
      fetchBookedSlots(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to book");
      }

      const params = new URLSearchParams(formData);
      router.push(`/bookings/summary?${params.toString()}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Book a Table</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 bg-white text-black">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 bg-white text-black border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Time</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full p-2 bg-white text-black border rounded"
          >
            <option value="">Select a Time</option>
            {[
              "10:00 AM",
              "11:00 AM",
              "12:00 PM",
              "1:00 PM",
              "2:00 PM",
              "3:00 PM",
              "4:00 PM",
              "5:00 PM",
              "6:00 PM",
              "7:00 PM",
              "8:00 PM",
              "9:00 PM",
            ].map((time) => (
              <option
                key={time}
                value={time}
                disabled={bookedSlots.some((slot) => slot.time === time)} // Disable booked times
              >
                {time} {bookedSlots.some((slot) => slot.time === time) ? "(Booked)" : ""}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 bg-white text-black">Number of Guests</label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
            min="1"
            max="10"
            className="w-full p-2 border rounded bg-white text-black"
          />
        </div>
        <div>
          <label className="block mb-1 bg-white text-black">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 bg-white text-black">Contact</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-white text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}
