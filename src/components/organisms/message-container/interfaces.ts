import { UserMessage } from '../../../models/userConnection';

export interface MessageContainerProps {
  messages: UserMessage[];
  sendMessage: (data: { message: string }) => void;
  closeConnection: () => void;
}
