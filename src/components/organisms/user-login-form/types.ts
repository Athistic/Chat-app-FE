import { z } from 'zod';

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type UserLoginFormData = z.infer<typeof UserLoginSchema>;

export interface UserLoginFormProps {
  loginUser: (data: UserLoginFormData) => void;
}
