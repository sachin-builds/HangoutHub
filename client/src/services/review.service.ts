import api from "./axios";

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;

  user: {
    id: string;
    name: string;
  };
}

export async function getReviews(cafeId: string) {
  const res = await api.get(`/reviews/cafe/${cafeId}`);
  return res.data;
}

export async function getAverageRating(cafeId: string) {
  const res = await api.get(`/reviews/average/${cafeId}`);
  return res.data;
}

export async function createReview(data: {
  rating: number;
  comment: string;
  userId: string;
  cafeId: string;
}) {
  const res = await api.post("/reviews", data);
  return res.data;
}