import z from "zod";

export const RegisterFormData = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  password: z.string().min(3),
  companyName: z.string().optional(),
});

export const LoginFormData=z.object({
      email: z.email(),
  password: z.string().min(3),
})