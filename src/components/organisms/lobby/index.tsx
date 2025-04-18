import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LobbyFormData, LobbyProps, lobbySchema } from './interfaces';
import { useNavigate } from 'react-router-dom';

const LobbyForm = (props: LobbyProps) => {
  const { joinRoom } = props;
  const navigate = useNavigate();

  const onSubmit = async (data: LobbyFormData) => {
    await joinRoom(data);
    navigate('/messenger');
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LobbyFormData>({
    resolver: zodResolver(lobbySchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-800 via-gray-900 to-black px-4">
      <div className="bg-gray-100/10 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md border border-cyan-400/20">
        <h2 className="text-cyan-300 text-3xl font-extrabold mb-6 text-center tracking-wide neon-glow-light">
          ⚡ Join a Room
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <input
              {...register('user')}
              placeholder="Your name"
              className="w-full p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300 border border-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-300 backdrop-blur"
            />
            <p className="text-red-500 text-sm mt-1">{errors.user?.message}</p>
          </div>
          <div>
            <input
              {...register('room')}
              placeholder="Room name"
              className="w-full p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300 border border-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-300 backdrop-blur"
            />
            <p className="text-red-500 text-sm mt-1">{errors.room?.message}</p>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 rounded-lg shadow-md transition duration-300 disabled:opacity-60"
          >
            {isSubmitting ? 'Joining...' : 'Join Room'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LobbyForm;
