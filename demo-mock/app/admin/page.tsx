'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getDashboardStats, getBookings, getRevenueData } from '@/lib/booking-engine';
import { formatCurrency } from '@/lib/utils';
import {
    LayoutDashboard,
    Calendar,
    Users,
    DollarSign,
    TrendingUp,
    LogOut,
    Hotel
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState(getDashboardStats());
    const [recentBookings, setRecentBookings] = useState(getBookings().slice(0, 5));
    const [revenueData, setRevenueData] = useState(getRevenueData().slice(-14)); // Last 14 days

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (!auth) {
            router.push('/admin/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        router.push('/admin/login');
    };

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
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation */}
                <nav className="mb-8">
                    <div className="flex gap-4">
                        <Link
                            href="/admin"
                            className="flex items-center gap-2 px-4 py-2 bg-primary-800 text-white rounded-md"
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/bookings"
                            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
                        >
                            <Calendar className="w-5 h-5" />
                            Bookings
                        </Link>
                    </div>
                </nav>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Today's Arrivals</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.todayArrivals}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-accent-600" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Today's Departures</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.todayDepartures}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-success-600" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                        <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-primary-600" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Occupancy Rate</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.occupancyRate}%</p>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: `${stats.occupancyRate}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue (Last 14 Days)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            />
                            <YAxis tickFormatter={(value) => `$${value}`} />
                            <Tooltip
                                formatter={(value: number) => formatCurrency(value)}
                                labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                            />
                            <Bar dataKey="revenue" fill="#1e40af" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                        <Link
                            href="/admin/bookings"
                            className="text-primary-600 hover:text-primary-800 font-semibold text-sm"
                        >
                            View All →
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reference</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Guest</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Dates</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Room</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-4">
                                            <Link
                                                href={`/admin/bookings/${booking.id}`}
                                                className="text-primary-600 hover:text-primary-800 font-medium"
                                            >
                                                {booking.reference.split('-').slice(-1)[0]}
                                            </Link>
                                        </td>
                                        <td className="py-4 px-4 text-gray-900">{booking.guestName}</td>
                                        <td className="py-4 px-4 text-gray-600 text-sm">
                                            {new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
                                            {new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="py-4 px-4 text-gray-900">{booking.roomType}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[booking.status]}`}>
                                                {booking.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right font-semibold text-gray-900">
                                            {formatCurrency(booking.totalAmount)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
