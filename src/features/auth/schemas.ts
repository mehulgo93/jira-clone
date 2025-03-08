import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const registerSchema = z.object({
    name: z.string().trim().min(1, "Required"),
    email: z.string().trim().min(1, "Required").email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(256, "Password must be less than 256 characters"),
  });