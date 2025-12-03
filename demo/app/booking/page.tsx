'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useBookingStore } from '@/lib/store';
import { checkAvailability, getRoomTypes, calculatePricing } from '@/lib/booking-engine';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { RoomAvailability } from '@/lib/types';
import { Calendar, Users, Maximize, ArrowLeft, Check } from 'lucide-react';
import { differenceInDays } from 'date-fns';

export default function BookingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800"></div>
            </div>
        }>
            <BookingContent />
        </Suspense>
    );
}

function BookingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { bookingData, setSelectedRoom } = useBookingStore();
    const [availableRooms, setAvailableRooms] = useState<RoomAvailability[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(searchParams.get('room'));

    useEffect(() => {
        if (bookingData.checkIn && bookingData.checkOut) {
            const rooms = checkAvailability({
                checkIn: bookingData.checkIn,
                checkOut: bookingData.checkOut,
                numGuests: bookingData.numGuests,
            });
            setAvailableRooms(rooms);
        } else {
            // If no dates selected, show all rooms
            const allRooms = getRoomTypes().map(room => ({
                ...room,
                availableCount: room.totalRooms,
                totalPrice: room.price * 2, // Default 2 nights
            }));
            setAvailableRooms(allRooms);
        }
    }, [bookingData.checkIn, bookingData.checkOut, bookingData.numGuests]);

    const handleSelectRoom = (roomId: string) => {
        setSelectedRoom(roomId);
        router.push('/booking/checkout');
    };

    const numNights = bookingData.checkIn && bookingData.checkOut
        ? differenceInDays(bookingData.checkOut, bookingData.checkIn)
        : 2;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Booking Summary */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Your Stay</h2>
                    <div className="flex flex-wrap gap-6 text-gray-700">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary-600" />
                            <span>
                                {bookingData.checkIn ? formatDate(bookingData.checkIn) : 'Select dates'} - {' '}
                                {bookingData.checkOut ? formatDate(bookingData.checkOut) : 'Select dates'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary-600" />
                            <span>{bookingData.numGuests} {bookingData.numGuests === 1 ? 'Guest' : 'Guests'}</span>
                        </div>
                        <div>
                            <span className="font-semibold">{numNights} {numNights === 1 ? 'Night' : 'Nights'}</span>
                        </div>
                    </div>
                </div>

                {/* Available Rooms */}
                <h1 className="text-4xl font-bold mb-8">Available Rooms</h1>

                {availableRooms.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-xl text-gray-600">No rooms available for the selected dates.</p>
                        <button
                            onClick={() => router.push('/')}
                            className="mt-4 text-primary-600 hover:text-primary-800 font-semibold"
                        >
                            Try different dates
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {availableRooms.map((room) => {
                            const pricing = calculatePricing(room.price, numNights);

                            return (
                                <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="md:flex">
                                        {/* Image Gallery */}
                                        <div className="md:w-2/5 relative h-80">
                                            <Image
                                                src={room.images[0]}
                                                alt={room.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Room Details */}
                                        <div className="md:w-3/5 p-8">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{room.name}</h3>
                                                    <p className="text-gray-600">{room.description}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                                                <span className="flex items-center gap-1">
                                                    <Maximize className="w-4 h-4" />
                                                    {room.size}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    Up to {room.maxOccupancy} guests
                                                </span>
                                                <span className="font-semibold text-success-600">
                                                    {room.availableCount} available
                                                </span>
                                            </div>

                                            {/* Amenities */}
                                            <div className="mb-6">
                                                <h4 className="font-semibold mb-3">Amenities</h4>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {room.amenities.map((amenity) => (
                                                        <div key={amenity} className="flex items-center gap-2 text-sm text-gray-700">
                                                            <Check className="w-4 h-4 text-success-600" />
                                                            {amenity}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Pricing */}
                                            <div className="border-t border-gray-200 pt-6">
                                                <div className="flex justify-between items-end">
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-gray-600">
                                                            {formatCurrency(room.price)}/night × {numNights} nights
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Taxes & fees: {formatCurrency(pricing.tax)}
                                                        </p>
                                                        <p className="text-3xl font-bold text-primary-800">
                                                            {formatCurrency(pricing.total)}
                                                        </p>
                                                        <p className="text-sm text-gray-500">Total price</p>
                                                    </div>

                                                    <button
                                                        onClick={() => handleSelectRoom(room.id)}
                                                        className="bg-primary-800 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200"
                                                    >
                                                        Select Room →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
