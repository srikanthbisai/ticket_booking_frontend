"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BookingSummary() {
  const searchParams = useSearchParams();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white/95 backdrop-blur rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-amber-900">Reservation Confirmed</h2>
          <p className="text-amber-700 mt-2">Your table awaits you</p>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-amber-50 rounded-lg border border-amber-200">
            <h3 className="font-serif font-semibold text-xl mb-4 text-amber-900">Booking Details</h3>
            <div className="space-y-3">
              {[
                { label: "Date", value: searchParams.get('date') },
                { label: "Time", value: searchParams.get('time') },
                { label: "Guests", value: searchParams.get('guests') },
                { label: "Name", value: searchParams.get('name') },
                { label: "Contact", value: searchParams.get('contact') }
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-amber-200 last:border-0">
                  <span className="font-medium text-amber-900">{label}</span>
                  <span className="text-amber-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <Link 
            href="/"
            className="block w-full text-center bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200"
          >
            Make Another Reservation
          </Link>
        </div>
      </div>
    </div>
  );
}