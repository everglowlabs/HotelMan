import { create } from 'zustand';
import type { BookingFormData } from './types';

interface BookingStore {
    bookingData: BookingFormData;
    setCheckInOut: (checkIn: Date | null, checkOut: Date | null) => void;
    setNumGuests: (numGuests: number) => void;
    setSelectedRoom: (roomId: string | null) => void;
    setGuestInfo: (info: Partial<BookingFormData>) => void;
    resetBooking: () => void;
}

const initialState: BookingFormData = {
    checkIn: null,
    checkOut: null,
    numGuests: 2,
    selectedRoomId: null,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    guestCountry: '',
    specialRequests: '',
};

export const useBookingStore = create<BookingStore>((set) => ({
    bookingData: initialState,

    setCheckInOut: (checkIn, checkOut) =>
        set((state) => ({
            bookingData: { ...state.bookingData, checkIn, checkOut },
        })),

    setNumGuests: (numGuests) =>
        set((state) => ({
            bookingData: { ...state.bookingData, numGuests },
        })),

    setSelectedRoom: (roomId) =>
        set((state) => ({
            bookingData: { ...state.bookingData, selectedRoomId: roomId },
        })),

    setGuestInfo: (info) =>
        set((state) => ({
            bookingData: { ...state.bookingData, ...info },
        })),

    resetBooking: () =>
        set({ bookingData: initialState }),
}));
