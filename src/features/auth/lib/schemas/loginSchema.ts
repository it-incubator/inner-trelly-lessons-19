import { z } from "zod/v4"

export const loginSchema = z.object({
  login: z.string().min(1, { error: 'Login is required' }),
  password: z
    .string()
    .min(1, { error: 'Password is required' })
    .min(3, { error: 'Password must be at least 3 characters long' }),
  rememberMe: z.boolean(),
})

export type LoginInputs = z.infer<typeof loginSchema>
