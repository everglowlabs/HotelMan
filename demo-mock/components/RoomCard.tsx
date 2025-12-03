'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { RoomType } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Users, Maximize } from 'lucide-react';

interface RoomCardProps {
    room: RoomType;
    showAvailability?: boolean;
    availableCount?: number;
}

export default function RoomCard({ room, showAvailability, availableCount }: RoomCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in">
            <div className="relative h-64">
                <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                        <Maximize className="w-4 h-4" />
                        {room.size}
                    </span>
                    <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Up to {room.maxOccupancy} guests
                    </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 4).map((amenity) => (
                        <span
                            key={amenity}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                            {amenity}
                        </span>
                    ))}
                    {room.amenities.length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{room.amenities.length - 4} more
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                        <p className="text-sm text-gray-500">From</p>
                        <p className="text-2xl font-bold text-primary-800">
                            {formatCurrency(room.price)}
                            <span className="text-sm font-normal text-gray-500">/night</span>
                        </p>
                    </div>

                    {showAvailability && availableCount !== undefined && (
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Available</p>
                            <p className="text-lg font-semibold text-success-600">
                                {availableCount} rooms
                            </p>
                        </div>
                    )}
                </div>

                <Link
                    href={`/booking?room=${room.id}`}
                    className="mt-4 block w-full text-center bg-primary-800 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
