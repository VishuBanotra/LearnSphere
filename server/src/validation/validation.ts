import { z } from "zod";

export const AuthValSchema = z.object({
  fullname: z
    .string()
    .min(5, { message: "Name should not be less than 5 characters." })
    .max(50, { message: "Name should not be more than 30 characters." }),
  username: z
    .string()
    .min(5, { message: "Email should not be less 8 than characters." })
    .max(50, { message: "Email should not be more than 100 charcters." }),
  email: z
    .string()
    .email()
    .min(8, { message: "Email should not be less 5 than characters." })
    .max(100, { message: "Email should not be more than 50 charcters." }),
  role: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "Password should not be less than 8 charcters." })
    .max(100, { message: "Password should not be more than 100 characters." }),
});

export const LoginSchema = z.object({
  UnameOrEmail: z
    .string()
    .min(5, {
      message: "Username or Email should not be less 8 than characters.",
    })
    .max(100, {
      message: "Username or Email should not be more than 100 charcters.",
    })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password should not be less than 8 charcters." })
    .max(100, { message: "Password should not be more than 100 characters." }),
});
