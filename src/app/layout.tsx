import type { Metadata } from "next";
import BookingProvider from "@/components/BookingProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Victoria Club Hotel | Oceanfront Luxury",
  description: "Victoria Club Hotel is an oceanfront sanctuary of timeless comfort, fine dining and restorative luxury.",
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
