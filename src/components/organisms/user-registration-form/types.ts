import { z } from 'zod';
import { UserRegistration } from '../../../api/models/user';

export interface UserRegistrationProps {
  registerUser: (data: UserRegistration) => void;
}

export const UserRegistrationFormSchema = z.object({
  name: z.string({ message: 'Please enter a character value' }).min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export type UserRegistrationFormData = z.infer<
  typeof UserRegistrationFormSchema
>;
