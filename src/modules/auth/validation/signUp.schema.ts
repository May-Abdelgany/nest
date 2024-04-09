import { z } from 'zod';

export const signUpSchema = {
  body: z
    .object({
      name: z.string().min(3).max(10),
      email: z.string().email(),
      password: z
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
      cPassword: z.string(),
    })
    .required()
    .refine((data: any) => data.password === data.cPassword, {
      message: "Password don't cPassword",
      path: ['confirm'], // path of error
    }),
 
};
