import api from "./axios";

export interface Cafe {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  openingTime?: string;
  closingTime?: string;
  wifi?: boolean;
  powerSockets?: boolean;
  noiseLevel?: number;
  priceRange: "BUDGET" | "MID" | "PREMIUM";
  createdAt: string;
  updatedAt: string;
}

export const getAllCafes = async (): Promise<Cafe[]> => {
  const response = await api.get("/cafes");
  return response.data;
};

export const getCafeById = async (id: string): Promise<Cafe> => {
  const response = await api.get(`/cafes/${id}`);
  return response.data;
};