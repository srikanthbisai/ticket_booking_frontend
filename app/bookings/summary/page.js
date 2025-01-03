// app/bookings/summary/page.js
"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BookingSummary() {
  const searchParams = useSearchParams();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">Thank you for your reservation</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-black rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Booking Details</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Date:</span> {searchParams.get('date')}</p>
              <p><span className="font-medium">Time:</span> {searchParams.get('time')}</p>
              <p><span className="font-medium">Guests:</span> {searchParams.get('guests')}</p>
              <p><span className="font-medium">Name:</span> {searchParams.get('name')}</p>
              <p><span className="font-medium">Contact:</span> {searchParams.get('contact')}</p>
            </div>
          </div>

          <Link 
            href="/"
            className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Book Another Table
          </Link>
        </div>
      </div>
    </div>
  );
}