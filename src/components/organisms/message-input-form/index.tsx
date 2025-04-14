import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const MessageInputSchema = z.object({
  message: z.string().min(1, 'Message is required'),
});

type MessageInputFormData = z.infer<typeof MessageInputSchema>;

export interface MessageInputProps {
  sendMessage: (data: { message: string }) => void;
}

const MessageInputForm = (props: MessageInputProps) => {
  const { sendMessage } = props;
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<MessageInputFormData>({
    resolver: zodResolver(MessageInputSchema),
  });

  const onSubmit = async (data: MessageInputFormData) => {
    await sendMessage(data);
    reset();
  };

  return (
    <div className="w-full px-4 py-3 border-t border-gray-700 bg-neutral-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-3"
      >
        <input
          {...register('message')}
          placeholder="What's happening?"
          className="flex-1 bg-neutral-800 text-white placeholder-gray-400 px-4 py-3 rounded-md shadow-inner border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition-all disabled:opacity-60"
        >
          {isSubmitting ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default MessageInputForm;
