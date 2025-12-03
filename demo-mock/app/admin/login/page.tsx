'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('demo@hotel.com');
    const [password, setPassword] = useState('Demo2024!');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (email === 'demo@hotel.com' && password === 'Demo2024!') {
            // Store simple auth flag
            localStorage.setItem('admin_auth', 'true');
            router.push('/admin');
        } else {
            setError('Invalid credentials. Use demo@hotel.com / Demo2024!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Q BOUTIQUE RESORT MALINDI</h1>
                    <p className="text-primary-200">Admin Dashboard</p>
                </div>

                <div className="bg-white rounded-lg shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                            {error}
                        </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                        <p className="text-sm text-blue-800 font-semibold mb-2">Demo Credentials:</p>
                        <p className="text-sm text-blue-700">Email: demo@hotel.com</p>
                        <p className="text-sm text-blue-700">Password: Demo2024!</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="demo@hotel.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary-800 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" className="text-sm text-primary-600 hover:text-primary-800">
                            ← Back to Hotel Website
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
