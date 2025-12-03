'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBookingStore } from '@/lib/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CheckCircle, Download, Calendar as CalendarIcon, Home } from 'lucide-react';

export default function ConfirmationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { bookingData, resetBooking } = useBookingStore();
    const [bookingRef] = useState(searchParams.get('ref') || 'GRP-20241220-DEMO');

    useEffect(() => {
        // Reset booking after 30 seconds
        const timer = setTimeout(() => {
            resetBooking();
        }, 30000);

        return () => clearTimeout(timer);
    }, [resetBooking]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                {/* Success Message */}
                <div className="text-center mb-8 animate-scale-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-success-100 rounded-full mb-4">
                        <CheckCircle className="w-12 h-12 text-success-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                    <p className="text-lg text-gray-600">
                        Your reservation has been successfully confirmed
                    </p>
                </div>

                {/* Booking Reference */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6 animate-fade-in">
                    <div className="text-center mb-6">
                        <p className="text-sm text-gray-600 mb-2">Your booking reference</p>
                        <p className="text-3xl font-bold text-primary-800 tracking-wide">{bookingRef}</p>
                    </div>

                    <div className="border-t border-gray-200 pt-6 space-y-4">
                        <h3 className="font-bold text-lg mb-4">Booking Details</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Guest Name</p>
                                <p className="font-semibold">{bookingData.guestName || 'John Doe'}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-semibold">{bookingData.guestEmail || 'john@example.com'}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600">Check-in</p>
                                <p className="font-semibold">
                                    {bookingData.checkIn ? formatDate(bookingData.checkIn) : 'Dec 20, 2024'}
                                </p>
                                <p className="text-xs text-gray-500">2:00 PM</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600">Check-out</p>
                                <p className="font-semibold">
                                    {bookingData.checkOut ? formatDate(bookingData.checkOut) : 'Dec 22, 2024'}
                                </p>
                                <p className="text-xs text-gray-500">11:00 AM</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600">Room Type</p>
                                <p className="font-semibold">Deluxe Suite</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600">Guests</p>
                                <p className="font-semibold">{bookingData.numGuests || 2} Guests</p>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">Total Paid</span>
                                <span className="text-2xl font-bold text-primary-800">
                                    {formatCurrency(448)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confirmation Email Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 animate-slide-up">
                    <p className="text-sm text-blue-800">
                        📧 A confirmation email has been sent to <strong>{bookingData.guestEmail || 'john@example.com'}</strong>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-md border border-gray-300 transition-colors duration-200">
                        <Download className="w-5 h-5" />
                        Download Confirmation PDF
                    </button>

                    <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-md border border-gray-300 transition-colors duration-200">
                        <CalendarIcon className="w-5 h-5" />
                        Add to Calendar
                    </button>
                </div>

                {/* Return Home Button */}
                <div className="text-center">
                    <button
                        onClick={() => {
                            resetBooking();
                            router.push('/');
                        }}
                        className="inline-flex items-center gap-2 bg-primary-800 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200"
                    >
                        <Home className="w-5 h-5" />
                        Return to Homepage
                    </button>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center text-sm text-gray-600">
                    <p>Need to make changes to your booking?</p>
                    <p className="mt-1">
                        Contact us at <a href="tel:+254201234567" className="text-primary-600 hover:underline">+254 20 123 4567</a> or{' '}
                        <a href="mailto:info@grandplaza.com" className="text-primary-600 hover:underline">info@grandplaza.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
