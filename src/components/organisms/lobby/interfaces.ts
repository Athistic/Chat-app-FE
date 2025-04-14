import { z } from 'zod';

export const lobbySchema = z.object({
  user: z.string().min(1, 'Name must have at least 3 characters'),
  room: z.string().min(3, 'Room must have at least 3 characters'),
});

export type LobbyFormData = z.infer<typeof lobbySchema>;

export interface LobbyProps {
  joinRoom: ({ user, room }: LobbyFormData) => void;
}
