// import roomData from "@/data/rooms.json";

// export type RoomGalleryImage = {
//   src: string;
//   alt: string;
// };

// export type Room = {
//   id: string;
//   title: string;
//   category: string;
//   pricePerNight: number;
//   currency: "INR";
//   capacity: number;
//   roomSize: string;
//   bed: string;
//   view: string;
//   image: string;
//   imageAlt: string;
//   description: string;
//   overview: string[];
//   gallery: RoomGalleryImage[];
//   amenities: string[];
//   unavailableDates: string[];
// };

// export const rooms = roomData as Room[];

// export function getRoom(id: string) {
//   return rooms.find((room) => room.id === id);
// }

// export function formatCurrency(value: number, currency: Room["currency"] = "INR") {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency,
//     maximumFractionDigits: 0,
//   }).format(value);
// }










import roomData from "@/data/rooms.json";

export type RoomGalleryImage = {
  src: string;
  alt: string;
};

export type Room = {
  id: string;
  title: string;
  category: string;
  roomType: string; // 'pricePerNight' ki jagah room type
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
