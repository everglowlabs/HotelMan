'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getBookings } from '@/lib/booking-engine';
import { formatCurrency } from '@/lib/utils';
import type { Booking } from '@/lib/types';
import { Search, Filter, Download, ArrowLeft, Hotel } from 'lucide-react';

export default function BookingsPage() {
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>(getBookings());
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (!auth) {
            router.push('/admin/login');
        }
    }, [router]);

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

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
                                <p className="text-sm text-gray-600">Admin Dashboard</p>
                            </div>
                        </div>
                        <Link
                            href="/admin"
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Bookings Management</h2>
                    <p className="text-gray-600">View and manage all hotel bookings</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Search className="inline w-4 h-4 mr-1" />
                                Search
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name, reference, or email..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Filter className="inline w-4 h-4 mr-1" />
                                Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="checked_in">Checked In</option>
                                <option value="checked_out">Checked Out</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing {filteredBookings.length} of {bookings.length} bookings
                        </p>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Reference</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Guest</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Contact</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Dates</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Room</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                                    <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Amount</th>
                                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50">
                                        <td className="py-4 px-6">
                                            <span className="font-mono text-sm font-semibold text-primary-600">
                                                {booking.reference.split('-').slice(-1)[0]}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-medium text-gray-900">{booking.guestName}</p>
                                                <p className="text-sm text-gray-500">{booking.guestCountry}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm">
                                                <p className="text-gray-900">{booking.guestEmail}</p>
                                                <p className="text-gray-500">{booking.guestPhone}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm">
                                                <p className="text-gray-900">
                                                    {new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                                <p className="text-gray-500">
                                                    to {new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </p>
                                                <p className="text-gray-500">{booking.numNights} nights</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-sm font-medium text-gray-900">{booking.roomType}</p>
                                            <p className="text-xs text-gray-500">{booking.numGuests} guests</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[booking.status]}`}>
                                                {booking.status.replace('_', ' ')}
                                            </span>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {booking.paymentStatus === 'paid' ? '✓ Paid' : 'Pending'}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <p className="font-semibold text-gray-900">{formatCurrency(booking.totalAmount)}</p>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <Link
                                                href={`/admin/bookings/${booking.id}`}
                                                className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredBookings.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No bookings found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
