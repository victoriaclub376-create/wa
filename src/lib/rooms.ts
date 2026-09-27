









import roomData from "@/data/rooms.json";

export type RoomGalleryImage = {
  src: string;
  alt: string;
};

export type Room = {
  id: string;
  title: string;
  category: string;
  // Optional: rooms.json me room type ka label `category` se aata hai.
  roomType?: string;
  pricePerNight: number;
  currency: "INR";
  capacity: number;
  roomSize: string;
  bed: string;
  view: string;
  image: string;
  imageAlt: string;
  description: string;
  overview: string[];
  gallery: RoomGalleryImage[];
  amenities: string[];
  unavailableDates: string[];
};

export const rooms = roomData as Room[];

export function getRoom(id: string) {
  return rooms.find((room) => room.id === id);
}


export function getLuxuryRoomLabel() {
  return "Luxury Room";
}
