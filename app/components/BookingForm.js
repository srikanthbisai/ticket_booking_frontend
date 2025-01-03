"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Users, User, Phone } from "lucide-react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });
  const [error, setError] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const router = useRouter();

  const fetchBookedSlots = async (date) => {
    try {
      const response = await fetch(`/api/bookings?date=${date}`);
      if (!response.ok) throw new Error("Failed to fetch booked slots");
      const data = await response.json();
      setBookedSlots(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (name === "date") {
      setBookedSlots([]);
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white/95 backdrop-blur rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-amber-900">Reserve Your Table</h2>
          <p className="text-amber-700 mt-2 text-sm">Experience exceptional dining</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Calendar className="absolute left-3 top-9 h-5 w-5 text-amber-600" />
            <label className="block mb-2 text-sm font-medium text-amber-900">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="pl-10 w-full p-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          
          <div className="relative">
            <Clock className="absolute left-3 top-9 h-5 w-5 text-amber-600" />
            <label className="block mb-2 text-sm font-medium text-amber-900">Time</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="pl-10 w-full p-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none"
            >
              <option value="">Select a Time</option>
              {["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", 
                "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"].map((time) => (
                <option
                  key={time}
                  value={time}
                  disabled={bookedSlots.some((slot) => slot.time === time)}
                  className="py-1"
                >
                  {time} {bookedSlots.some((slot) => slot.time === time) ? "(Booked)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Users className="absolute left-3 top-9 h-5 w-5 text-amber-600" />
            <label className="block mb-2 text-sm font-medium text-amber-900">Number of Guests</label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              min="1"
              max="10"
              className="pl-10 w-full p-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="relative">
            <User className="absolute left-3 top-9 h-5 w-5 text-amber-600" />
            <label className="block mb-2 text-sm font-medium text-amber-900">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="pl-10 w-full p-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-9 h-5 w-5 text-amber-600" />
            <label className="block mb-2 text-sm font-medium text-amber-900">Contact</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="pl-10 w-full p-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200 mt-6"
          >
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
}