import { z } from "zod";

export const RegisterValidator = z.object({
  email: z.string().email({ message: "Paramter email tidak sesuai format" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  password: z.string().min(8, { message: "" }),
  profile_image: z.string().optional(),
});

export const LoginValidator = z.object({
  email: z.string().email({ message: "Paramter email tidak sesuai format" }),
  password: z.string().min(8, { message: "Password harus minimal 8 karakter" }),
});
