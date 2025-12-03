import Image from 'next/image';
import { getHotel, getRoomTypes } from '@/lib/booking-engine';
import SearchWidget from '@/components/SearchWidget';
import RoomCard from '@/components/RoomCard';
import { Star, Wifi, Waves, Utensils, Dumbbell, Car, Clock } from 'lucide-react';

export default function HomePage() {
  const hotel = getHotel();
  const rooms = getRoomTypes();

  const amenityIcons: Record<string, React.ReactNode> = {
    'WiFi': <Wifi className="w-5 h-5" />,
    'Pool': <Waves className="w-5 h-5" />,
    'Restaurant': <Utensils className="w-5 h-5" />,
    'Gym': <Dumbbell className="w-5 h-5" />,
    'Parking': <Car className="w-5 h-5" />,
    '24/7 Reception': <Clock className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-800">{hotel.name}</h1>
              <p className="text-gray-600">{hotel.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-accent-500 text-accent-500" />
              <span className="font-semibold text-lg">{hotel.rating}</span>
              <span className="text-gray-500">({hotel.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px]">
        <Image
          src="/images/hotel-exterior.jpg"
          alt={hotel.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h2 className="text-5xl font-bold mb-4 text-center animate-fade-in">
            Experience Luxury in the Heart of the City
          </h2>
          <p className="text-xl mb-8 text-center max-w-2xl animate-slide-up">
            {hotel.description}
          </p>
        </div>
      </section>

      {/* Search Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchWidget />
      </section>

      {/* Rooms Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-4">Our Rooms & Suites</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose from our selection of elegantly designed rooms and suites, each offering comfort and luxury
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* Amenities Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Hotel Amenities</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {hotel.amenities.map((amenity) => (
              <div key={amenity} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-3 text-primary-800">
                  {amenityIcons[amenity] || <Star className="w-5 h-5" />}
                </div>
                <span className="text-sm font-medium text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Explore Our Facilities</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image
              src="/images/hotel-pool.jpg"
              alt="Hotel Pool"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white text-2xl font-bold p-6">Rooftop Pool</p>
            </div>
          </div>

          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image
              src="/images/hotel-restaurant.jpg"
              alt="Hotel Restaurant"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white text-2xl font-bold p-6">Fine Dining Restaurant</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{hotel.name}</h3>
              <p className="text-gray-400">{hotel.address}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">Phone: {hotel.phone}</p>
              <p className="text-gray-400">Email: {hotel.email}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Check-in/out</h3>
              <p className="text-gray-400">Check-in: {hotel.checkInTime}</p>
              <p className="text-gray-400">Check-out: {hotel.checkOutTime}</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {hotel.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
