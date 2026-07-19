import api from "@/lib/axios";

export const getFavorites = async () => {
  const response = await api.get("/favorites", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const addFavorite = async (cafeId: string) => {
  const response = await api.post(
    "/favorites",
    { cafeId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};

export const removeFavorite = async (cafeId: string) => {
  const response = await api.delete(`/favorites/${cafeId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};