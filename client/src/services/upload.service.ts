import api from "@/lib/axios";

export async function uploadCafeImage(file: File) {
  const formData = new FormData();

  formData.append("image", file);

  const res = await api.post(
    "/cafes/upload",
    formData
  );

  return res.data.imageUrl;
}