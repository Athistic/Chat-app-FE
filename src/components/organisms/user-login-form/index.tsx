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
    formState: { isSubmitting },
  } = useForm<UserLoginFormData>({
    resolver: zodResolver(UserLoginSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email Address
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 text-white p-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/registration" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserLoginForm;
