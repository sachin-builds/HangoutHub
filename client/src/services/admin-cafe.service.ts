import api from "@/lib/axios";

export const getAdminCafes = async () => {
  const res = await api.get("/cafes");
  return res.data;
};

export const deleteCafe = async (id: string) => {
  await api.delete(`/cafes/${id}`);
};

export const createCafe = async (data: any) => {
  const res = await api.post("/cafes", data);
  return res.data;
};

export const updateCafe = async (
  id: string,
  data: any
) => {
  const res = await api.patch(`/cafes/${id}`, data);
  return res.data;
};