'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users } from 'lucide-react';
import { useBookingStore } from '@/lib/store';
import { addDays } from 'date-fns';

export default function SearchWidget() {
    const router = useRouter();
    const { setCheckInOut, setNumGuests } = useBookingStore();

    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');
    const [guests, setGuests] = useState(2);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (checkIn && checkOut) {
            setCheckInOut(new Date(checkIn), new Date(checkOut));
            setNumGuests(guests);
            router.push('/booking');
        }
    };

    // Set default dates (today + 7 days to today + 9 days)
    const defaultCheckIn = new Date().toISOString().split('T')[0];
    const defaultCheckOut = addDays(new Date(), 2).toISOString().split('T')[0];

    return (
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto -mt-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Check-in
                    </label>
                    <input
                        type="date"
                        value={checkIn || defaultCheckIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Check-out
                    </label>
                    <input
                        type="date"
                        value={checkOut || defaultCheckOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn || defaultCheckIn}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="inline w-4 h-4 mr-1" />
                        Guests
                    </label>
                    <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                        {[1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-end">
                    <button
                        type="submit"
                        className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200"
                    >
                        Search Rooms
                    </button>
                </div>
            </div>
        </form>
    );
}
