export interface Hotel {
    name: string;
    slug: string;
    description: string;
    location: string;
    email: string;
    phone: string;
    address: string;
    rating: number;
    reviewCount: number;
    amenities: string[];
    checkInTime: string;
    checkOutTime: string;
    currency: string;
    images: string[];
}

export interface RoomType {
    id: string;
    name: string;
    description: string;
    price: number;
    size: string;
    beds: string;
    maxOccupancy: number;
    totalRooms: number;
    amenities: string[];
    images: string[];
}

export interface Booking {
    id: string;
    reference: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    guestCountry: string;
    checkIn: string;
    checkOut: string;
    roomType: string;
    roomId: string;
    numGuests: number;
    numNights: number;
    roomRate: number;
    totalAmount: number;
    taxAmount: number;
    status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
    specialRequests?: string;
    createdAt: string;
}

export interface BookingFormData {
    checkIn: Date | null;
    checkOut: Date | null;
    numGuests: number;
    selectedRoomId: string | null;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    guestCountry: string;
    specialRequests: string;
}

export interface AvailabilityQuery {
    checkIn: Date;
    checkOut: Date;
    numGuests: number;
}

export interface RoomAvailability extends RoomType {
    availableCount: number;
    totalPrice: number;
}
