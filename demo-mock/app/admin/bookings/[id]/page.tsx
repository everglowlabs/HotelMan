'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getBookings } from '@/lib/booking-engine';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, User, Mail, Phone, Globe, Calendar, Users, CreditCard, MessageSquare, Hotel } from 'lucide-react';

export default function BookingDetailPage() {
    const router = useRouter();
    const params = useParams();
    const bookingId = params.id as string;

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (!auth) {
            router.push('/admin/login');
        }
    }, [router]);

    const booking = getBookings().find(b => b.id === bookingId);

    if (!booking) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">Booking not found</p>
                    <Link href="/admin/bookings" className="text-primary-600 hover:text-primary-800">
                        ← Back to Bookings
                    </Link>
                </div>
            </div>
        );
    }

    const statusColors: Record<string, string> = {
        confirmed: 'bg-success-100 text-success-800',
        pending: 'bg-accent-100 text-accent-800',
        checked_in: 'bg-blue-100 text-blue-800',
        checked_out: 'bg-gray-100 text-gray-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Hotel className="w-8 h-8 text-primary-800" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Q BOUTIQUE RESORT MALINDI</h1>
                                <p className="text-sm text-gray-600">Booking Details</p>
                            </div>
                        </div>
                        <Link
                            href="/admin/bookings"
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Bookings
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Booking Reference and Status */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Booking #{booking.reference}
                            </h2>
                            <p className="text-gray-600">
                                Created on {new Date(booking.createdAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[booking.status]}`}>
                            {booking.status.replace('_', ' ').toUpperCase()}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Guest Information */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Guest Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Full Name</p>
                                        <p className="font-semibold text-gray-900">{booking.guestName}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-semibold text-gray-900">{booking.guestEmail}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Phone</p>
                                        <p className="font-semibold text-gray-900">{booking.guestPhone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Country</p>
                                        <p className="font-semibold text-gray-900">{booking.guestCountry}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booking Information */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Check-in</p>
                                        <p className="font-semibold text-gray-900">
                                            {new Date(booking.checkIn).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>
                                        <p className="text-sm text-gray-500">2:00 PM</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Check-out</p>
                                        <p className="font-semibold text-gray-900">
                                            {new Date(booking.checkOut).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>
                                        <p className="text-sm text-gray-500">11:00 AM</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Hotel className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Room Type</p>
                                        <p className="font-semibold text-gray-900">{booking.roomType}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Guests</p>
                                        <p className="font-semibold text-gray-900">{booking.numGuests} Guests</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Nights</p>
                                        <p className="font-semibold text-gray-900">{booking.numNights} Nights</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Special Requests */}
                        {booking.specialRequests && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5" />
                                    Special Requests
                                </h3>
                                <p className="text-gray-700">{booking.specialRequests}</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Payment Details */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Payment Details
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Room Rate</span>
                                    <span className="font-medium">{formatCurrency(booking.roomRate)}/night</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Nights</span>
                                    <span className="font-medium">× {booking.numNights}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">{formatCurrency(booking.roomRate * booking.numNights)}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Taxes & Fees</span>
                                    <span className="font-medium">{formatCurrency(booking.taxAmount)}</span>
                                </div>

                                <div className="border-t border-gray-200 pt-3 flex justify-between">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="font-bold text-xl text-primary-800">{formatCurrency(booking.totalAmount)}</span>
                                </div>

                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Payment Status</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.paymentStatus === 'paid' ? 'bg-success-100 text-success-800' : 'bg-accent-100 text-accent-800'
                                            }`}>
                                            {booking.paymentStatus.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Actions</h3>

                            <div className="space-y-3">
                                {booking.status === 'confirmed' && (
                                    <button className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                                        Check In
                                    </button>
                                )}

                                {booking.status === 'checked_in' && (
                                    <button className="w-full bg-success-600 hover:bg-success-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                                        Check Out
                                    </button>
                                )}

                                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-md border border-gray-300 transition-colors">
                                    Modify Booking
                                </button>

                                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-md border border-gray-300 transition-colors">
                                    Print Details
                                </button>

                                {booking.status !== 'cancelled' && booking.status !== 'checked_out' && (
                                    <button className="w-full bg-white hover:bg-red-50 text-red-600 font-semibold py-2 px-4 rounded-md border border-red-300 transition-colors">
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
