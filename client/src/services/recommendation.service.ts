import api from "@/lib/axios";

export const getRecommendations = async (prompt: string) => {
  const response = await api.post("/recommendations", {
    prompt,
  });

  return response.data;
};