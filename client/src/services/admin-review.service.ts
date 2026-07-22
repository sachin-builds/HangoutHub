import api from "@/lib/axios";

export interface AdminReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;

  user: {
    id: string;
    name: string;
    email: string;
  };

  cafe: {
    id: string;
    name: string;
  };
}

export const getReviews = async (
  search?: string
): Promise<AdminReview[]> => {
  const res = await api.get("/admin/reviews", {
    params: {
      search,
    },
  });

  return res.data;
};

export const deleteReview = async (id: string) => {
  await api.delete(`/admin/reviews/${id}`);
};