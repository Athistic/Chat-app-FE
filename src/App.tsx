import { useState } from 'react';
import './App.css';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { UserMessage } from './models/userConnection';
import LobbyForm from './components/organisms/lobby';
import { LobbyFormData } from './components/organisms/lobby/interfaces';
import MessageContainer from './components/organisms/message-container';

function App() {
  const [connection, setConnection] = useState<HubConnection>();

  const [messages, setMessages] = useState<UserMessage[]>([]);

  const joinRoom = async ({ user, room }: LobbyFormData) => {
    try {
      console.log('new SignalR URL:', import.meta.env.VITE_SIGNALR_URL);
      const connection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_SIGNALR_URL)
        .configureLogging(LogLevel.Information)
        .build();

      connection.on('ReceiveMessage', (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      await connection.start();
      await connection?.invoke('JoinRoom', { user, room });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (data: { message: string }) => {
    try {
      await connection?.invoke('SendMessage', data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection?.stop();
      setConnection(undefined);
      setMessages([]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {!connection ? (
        <LobbyForm joinRoom={joinRoom} />
      ) : (
        <MessageContainer
          messages={messages}
          sendMessage={sendMessage}
          closeConnection={closeConnection}
        />
      )}
    </>
  );
}
export default App;
