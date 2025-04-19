import { useForm } from 'react-hook-form';
import {
  UserLoginFormData,
  UserLoginFormProps,
  UserLoginSchema,
} from './types';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { useNavigate } from 'react-router-dom';

const UserLoginForm = (props: UserLoginFormProps) => {
  const { loginUser } = props;
  const navigate = useNavigate();

  const onSubmit = async (data: UserLoginFormData) => {
    await loginUser(data);
    navigate('/join');
  };

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<UserLoginFormData>({
    resolver: zodResolver(UserLoginSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-green-400/20">
        <h2 className="text-green-400 text-3xl font-extrabold mb-6 text-center tracking-widest neon-glow">
          🔐 Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email address"
              className="w-full p-3 rounded-lg bg-black/40 text-green-100 placeholder-green-300 border border-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-black/40 text-green-100 placeholder-green-300 border border-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg shadow-lg transition duration-300 disabled:opacity-60"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-green-200">
          Don’t have an account?{' '}
          <a href="/registration" className="text-cyan-400 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserLoginForm;
