'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/lib/store';
import { getRoomTypes, calculatePricing, createBooking } from '@/lib/booking-engine';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { differenceInDays } from 'date-fns';

export default function CheckoutPage() {
    const router = useRouter();
    const { bookingData, setGuestInfo, resetBooking } = useBookingStore();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [createdBooking, setCreatedBooking] = useState<any>(null);

    const room = getRoomTypes().find(r => r.id === bookingData.selectedRoomId);

    if (!room || !bookingData.checkIn || !bookingData.checkOut) {
        router.push('/booking');
        return null;
    }

    const numNights = differenceInDays(bookingData.checkOut, bookingData.checkIn);
    const pricing = calculatePricing(room.price, numNights);

    const handleGuestInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        setGuestInfo({
            guestName: formData.get('name') as string,
            guestEmail: formData.get('email') as string,
            guestPhone: formData.get('phone') as string,
            guestCountry: formData.get('country') as string,
            specialRequests: formData.get('requests') as string,
        });

        setStep(2);
    };

    const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            const booking = createBooking({
                roomId: room.id,
                checkIn: bookingData.checkIn!,
                checkOut: bookingData.checkOut!,
                numGuests: bookingData.numGuests,
                guestName: bookingData.guestName,
                guestEmail: bookingData.guestEmail,
                guestPhone: bookingData.guestPhone,
                guestCountry: bookingData.guestCountry,
                specialRequests: bookingData.specialRequests,
            });

            setCreatedBooking(booking);
            setIsProcessing(false);
            router.push(`/booking/confirmation?ref=${booking.reference}`);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => step === 1 ? router.push('/booking') : setStep(1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-800 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                1
                            </div>
                            <span className="ml-2 font-medium">Guest Info</span>
                        </div>
                        <div className="w-24 h-1 bg-gray-300">
                            <div className={`h-full ${step >= 2 ? 'bg-primary-800' : 'bg-gray-300'}`} />
                        </div>
                        <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-800 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                2
                            </div>
                            <span className="ml-2 font-medium">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {step === 1 ? (
                            <div className="bg-white rounded-lg shadow-md p-8">
                                <h2 className="text-3xl font-bold mb-6">Guest Information</h2>

                                <form onSubmit={handleGuestInfoSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Country *
                                        </label>
                                        <select
                                            name="country"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        >
                                            <option value="">Select Country</option>
                                            <option value="United States">United States</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Kenya">Kenya</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Special Requests (Optional)
                                        </label>
                                        <textarea
                                            name="requests"
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="Any special requests or requirements..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-md transition-colors duration-200"
                                    >
                                        Continue to Payment →
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-8">
                                <h2 className="text-3xl font-bold mb-6">Payment Details</h2>

                                <div className="bg-accent-50 border border-accent-200 rounded-md p-4 mb-6">
                                    <p className="text-sm font-semibold text-accent-800">
                                        ⚠️ DEMO MODE: Use test card 4242 4242 4242 4242
                                    </p>
                                </div>

                                <form onSubmit={handlePayment} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Card Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                defaultValue="4242 4242 4242 4242"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                placeholder="1234 5678 9012 3456"
                                            />
                                            <CreditCard className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="12/25"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                placeholder="MM/YY"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                CVC
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="123"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                placeholder="123"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Lock className="w-4 h-4" />
                                        <span>Secured by Stripe</span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? 'Processing...' : `Complete Booking - Pay ${formatCurrency(pricing.total)}`}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Booking Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h3 className="text-xl font-bold mb-4">Booking Summary</h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600">Room</p>
                                    <p className="font-semibold">{room.name}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Check-in</p>
                                    <p className="font-semibold">{formatDate(bookingData.checkIn)}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Check-out</p>
                                    <p className="font-semibold">{formatDate(bookingData.checkOut)}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Guests</p>
                                    <p className="font-semibold">{bookingData.numGuests} {bookingData.numGuests === 1 ? 'Guest' : 'Guests'}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Nights</p>
                                    <p className="font-semibold">{numNights} {numNights === 1 ? 'Night' : 'Nights'}</p>
                                </div>

                                <div className="border-t border-gray-200 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Room rate</span>
                                        <span>{formatCurrency(pricing.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Taxes & fees</span>
                                        <span>{formatCurrency(pricing.tax)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                                        <span>Total</span>
                                        <span className="text-primary-800">{formatCurrency(pricing.total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
