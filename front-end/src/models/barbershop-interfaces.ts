export interface Booking {
  id: string;
  date: Date;
}

export interface BarberShopServices {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  bookings: Booking[];
}

export interface BarberShop {
  id: string;
  name: string;
  address: string;
  phones: string[];
  description: string;
  imageUrl: string;
  services: BarberShopServices[];
}
