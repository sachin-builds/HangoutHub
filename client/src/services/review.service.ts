import api from "@/lib/axios";

export interface CreateReviewDto {
  cafeId: string;
  rating: number;
  comment: string;
}

export const createReview = async (
  data: CreateReviewDto
) => {
  const response = await api.post("/reviews", data);
  return response.data;
};

export const getCafeReviews = async (
  cafeId: string
) => {
  const response = await api.get(
    `/reviews/cafe/${cafeId}`
  );

  return response.data;
};

export const getAverageRating = async (
  cafeId: string
) => {
  const response = await api.get(
    `/reviews/cafe/${cafeId}/average-rating`
  );

  return response.data;
};