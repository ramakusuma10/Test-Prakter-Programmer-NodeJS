import { z } from "zod";

export const RegisterValidator = z.object({
  email: z.string().email({ message: "Paramter email tidak sesuai format" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  password: z.string().min(8, { message: "Password harus minimal 8 karakter" }),
  profile_image: z.string().optional(),
});

export const LoginValidator = z.object({
  email: z.string().email({ message: "Paramter email tidak sesuai format" }),
  password: z.string().min(8, { message: "Password harus minimal 8 karakter" }),
});

export const UserValidator = z.object({
  first_name: z.string().min(1, "First name tidak boleh kosong"),
  last_name: z.string().min(1, "Last name tidak boleh kosong"),
});

export const topupValidator = z.object({
  top_up_amount: z.number().min(1, {
    message:
      "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
  }),
});
