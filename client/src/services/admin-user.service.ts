import api from "@/lib/axios";
import { AdminUser } from "@/types/user";

export const getUsers = async (
  search?: string
): Promise<AdminUser[]> => {
  const res = await api.get("/admin/users", {
    params: {
      search,
    },
  });

  return res.data;
};

export const deleteUser = async (id: string) => {
  await api.delete(`/admin/users/${id}`);
};