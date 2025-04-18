export interface UserRegistration {
  name: string;
  email: string;
  password: string;
}

export type UserLogin = Omit<UserRegistration, 'name'>;
