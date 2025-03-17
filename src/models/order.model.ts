export interface OrderModel {
    id: number;
    movieId: number;
    title: string; 
    location: string;
    theaterId: number;
    count: number;
    pricePerItem: number;
    status: string;
    rating: number | null;
    shortDescription: string;
    destination: string;
  }
  