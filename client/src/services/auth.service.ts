import api from "@/lib/axios";

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterDto) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginDto) => {
  const response = await api.post("/auth/login", data);

  localStorage.setItem("token", response.data.access_token);

  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

  return response.data;
};