import api from "@/lib/axios";

export const getAllCafes = async () => {
  const response = await api.get("/cafes");
  return response.data;
};

export const searchCafes = async (params: {
  search?: string;
  address?: string;
  priceRange?: string;
}) => {
  const response = await api.get("/cafes", {
    params,
  });

  return response.data;
};

export const getCafeById = async (id: string) => {
  const response = await api.get(`/cafes/${id}`);
  return response.data;
};