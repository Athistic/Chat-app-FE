import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LobbyFormData, LobbyProps, lobbySchema } from './interfaces';

const LobbyForm = (props: LobbyProps) => {
  const { joinRoom } = props;

  const onSubmit = async (data: LobbyFormData) => {
    await joinRoom(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LobbyFormData>({
    resolver: zodResolver(lobbySchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-sky-200 to-cyan-100 px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md border border-blue-200/50">
        <h2 className="text-sky-800 text-3xl font-bold mb-6 text-center tracking-tight">
          Join a Room
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <input
              {...register('user')}
              placeholder="Your name"
              className="w-full p-3 rounded-lg bg-white/50 text-slate-700 placeholder-slate-400 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm"
            />
            <p className="text-red-500 text-sm mt-1">{errors.user?.message}</p>
          </div>
          <div>
            <input
              {...register('room')}
              placeholder="Room name"
              className="w-full p-4 rounded-lg bg-white/50 text-slate-700 placeholder-slate-400 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm"
            />
            <p className="text-red-500 text-sm mt-1">{errors.room?.message}</p>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 disabled:opacity-60"
          >
            {isSubmitting ? 'Joining...' : 'Join Room'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LobbyForm;
