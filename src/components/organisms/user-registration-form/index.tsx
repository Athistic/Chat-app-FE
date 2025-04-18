import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  UserRegistrationFormData,
  UserRegistrationFormSchema,
  UserRegistrationProps,
} from './types';

const RegistrationForm = (props: UserRegistrationProps) => {
  const { registerUser } = props;

  const onSubmit = async (data: UserRegistrationFormData) => {
    await registerUser(data);
  };

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<UserRegistrationFormData>({
    resolver: zodResolver(UserRegistrationFormSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-800 via-gray-900 to-black px-4">
      <div className="bg-gray-100/10 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md border border-cyan-400/20">
        <h2 className="text-cyan-300 text-3xl font-extrabold mb-6 text-center tracking-wide neon-glow-light">
          ⚡ Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-cyan-200 font-medium mb-1"
            >
              Full Name
            </label>
            <input
              {...register('name')}
              id="name"
              type="text"
              className="w-full p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300 border border-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-cyan-200 font-medium mb-1"
            >
              Email Address
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              className="w-full p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300 border border-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-cyan-200 font-medium mb-1"
            >
              Password
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              className="w-full p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300 border border-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 rounded-lg shadow-md transition duration-300 disabled:opacity-60"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-cyan-100">
          Already have an account?{' '}
          <a href="/login" className="text-cyan-300 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
