import api from "@/lib/axios";

export interface Cafe {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  averageCost?: number;
  wifi: boolean;
  powerSockets: boolean;
  noiseLevel: number;
  openingTime?: string;
  closingTime?: string;
  priceRange: string;
  isOpen: boolean;
  reviews: any[];
  favorites: any[];
  vibes: any[];
}

export interface SearchCafeDto {
  search?: string;
  address?: string;
  priceRange?: string;
}

// Get all cafes
export const getAllCafes = async () => {
  const response = await api.get("/cafes");
  return response.data;
};

// Search cafes
export const searchCafes = async (
  filters: SearchCafeDto
) => {
  const params: any = {};

  if (filters.search) {
    params.city = filters.search;
  }

  if (filters.address) {
    params.address = filters.address;
  }

  if (
    filters.priceRange &&
    filters.priceRange !== "Budget" &&
    filters.priceRange !== ""
  ) {
    params.priceRange = filters.priceRange.toUpperCase();
  }

  const response = await api.get("/cafes", {
    params,
  });

  return response.data;
};

// Get single cafe
export const getCafeById = async (id: string) => {
  const response = await api.get(`/cafes/${id}`);

  return response.data;
};