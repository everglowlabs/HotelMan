import { differenceInDays, isWithinInterval, parseISO } from 'date-fns';
import hotelData from './data/hotel.json';
import roomsData from './data/rooms.json';
import bookingsData from './data/bookings.json';
import type { Hotel, RoomType, Booking, RoomAvailability, AvailabilityQuery } from './types';

const TAX_RATE = 0.12; // 12% tax

export function getHotel(): Hotel {
    return hotelData as Hotel;
}

export function getRoomTypes(): RoomType[] {
    return roomsData as RoomType[];
}

export function getBookings(): Booking[] {
    return bookingsData as Booking[];
}

export function getBookingByReference(reference: string): Booking | undefined {
    const bookings = getBookings();
    return bookings.find(b => b.reference === reference);
}

/**
 * Check availability for rooms based on dates
 */
export function checkAvailability(query: AvailabilityQuery): RoomAvailability[] {
    const { checkIn, checkOut, numGuests } = query;
    const rooms = getRoomTypes();
    const bookings = getBookings();

    const numNights = differenceInDays(checkOut, checkIn);

    return rooms
        .filter(room => room.maxOccupancy >= numGuests)
        .map(room => {
            // Count how many of this room type are booked during the requested period
            const bookedCount = bookings.filter(booking => {
                if (booking.roomId !== room.id) return false;
                if (booking.status === 'cancelled') return false;

                const bookingCheckIn = parseISO(booking.checkIn);
                const bookingCheckOut = parseISO(booking.checkOut);

                // Check if dates overlap
                return (
                    isWithinInterval(checkIn, { start: bookingCheckIn, end: bookingCheckOut }) ||
                    isWithinInterval(checkOut, { start: bookingCheckIn, end: bookingCheckOut }) ||
                    isWithinInterval(bookingCheckIn, { start: checkIn, end: checkOut })
                );
            }).length;

            const availableCount = Math.max(0, room.totalRooms - bookedCount);
            const totalPrice = room.price * numNights;

            return {
                ...room,
                availableCount,
                totalPrice,
            };
        })
        .filter(room => room.availableCount > 0);
}

/**
 * Calculate pricing for a booking
 */
export function calculatePricing(roomPrice: number, numNights: number) {
    const subtotal = roomPrice * numNights;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return {
        subtotal,
        tax,
        total,
        numNights,
    };
}

/**
 * Generate a unique booking reference
 */
export function generateBookingReference(): string {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `GRP-${dateStr}-${randomStr}`;
}

/**
 * Create a new booking (simulated)
 */
export function createBooking(data: {
    roomId: string;
    checkIn: Date;
    checkOut: Date;
    numGuests: number;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    guestCountry: string;
    specialRequests?: string;
}): Booking {
    const room = getRoomTypes().find(r => r.id === data.roomId);
    if (!room) throw new Error('Room not found');

    const numNights = differenceInDays(data.checkOut, data.checkIn);
    const pricing = calculatePricing(room.price, numNights);

    const booking: Booking = {
        id: `booking-${Date.now()}`,
        reference: generateBookingReference(),
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        guestCountry: data.guestCountry,
        checkIn: data.checkIn.toISOString().split('T')[0],
        checkOut: data.checkOut.toISOString().split('T')[0],
        roomType: room.name,
        roomId: room.id,
        numGuests: data.numGuests,
        numNights,
        roomRate: room.price,
        totalAmount: pricing.total,
        taxAmount: pricing.tax,
        status: 'pending',
        paymentStatus: 'pending',
        specialRequests: data.specialRequests || '',
        createdAt: new Date().toISOString(),
    };

    return booking;
}

/**
 * Get dashboard statistics
 */
export function getDashboardStats() {
    const bookings = getBookings();
    const today = new Date().toISOString().split('T')[0];

    const todayArrivals = bookings.filter(b => b.checkIn === today && b.status !== 'cancelled').length;
    const todayDepartures = bookings.filter(b => b.checkOut === today && b.status !== 'cancelled').length;
    const totalRevenue = bookings
        .filter(b => b.paymentStatus === 'paid')
        .reduce((sum, b) => sum + b.totalAmount, 0);

    const rooms = getRoomTypes();
    const totalRooms = rooms.reduce((sum, r) => sum + r.totalRooms, 0);
    const occupiedRooms = bookings.filter(b =>
        b.status === 'checked_in' || b.status === 'confirmed'
    ).length;
    const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

    return {
        todayArrivals,
        todayDepartures,
        totalRevenue,
        occupancyRate,
        occupiedRooms,
        totalRooms,
    };
}

/**
 * Get revenue data for chart (last 30 days)
 */
export function getRevenueData() {
    const bookings = getBookings();
    const data: { date: string; revenue: number }[] = [];

    // Generate last 30 days
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        const dayRevenue = bookings
            .filter(b => b.createdAt.startsWith(dateStr) && b.paymentStatus === 'paid')
            .reduce((sum, b) => sum + b.totalAmount, 0);

        data.push({
            date: dateStr,
            revenue: dayRevenue,
        });
    }

    return data;
}
