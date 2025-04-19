import { useEffect, useState } from 'react';
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
import RegistrationForm from './components/organisms/user-registration-form';
import { UserRegistrationFormData } from './components/organisms/user-registration-form/types';
import { UserLoginFormData } from './components/organisms/user-login-form/types';
import UserLoginForm from './components/organisms/user-login-form';
import { UserRegistration } from './api/models/user';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import paths from './shared/paths';
import NavBar from './components/molecules/nav-bar';
import HomePage from './components/pages/home';

function App() {
  const [connection, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [userDetails, setUserDetails] = useState<UserRegistration>();

  //Register api
  const registerUser = async (formData: UserRegistrationFormData) => {
    try {
      const response = await fetch('https://localhost:7134/api/User/Register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: formData?.name,
          email: formData?.email,
          password: formData?.password,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error:${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loginUser = async (data: UserLoginFormData) => {
    try {
      const response = await fetch('https://localhost:7134/api/User/Login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          email: data?.email,
          password: data?.password,
        }),
        credentials: 'include',
      });
      getUser();

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch('https://localhost:7134/api/User', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      const data = await response.json();
      console.log('data', data);
      setUserDetails(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const joinRoom = async ({ user, room }: LobbyFormData) => {
    try {
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
    <BrowserRouter basename="/Chat-app-FE/">
      <NavBar />
      <Routes>
        <Route path={paths.home} element={<HomePage />} />
        <Route
          path={paths.registration}
          element={<RegistrationForm registerUser={registerUser} />}
        />
        <Route
          path={paths.login}
          element={!userDetails && <UserLoginForm loginUser={loginUser} />}
        />
        <Route
          path={paths.join}
          element={
            userDetails && !connection ? (
              <LobbyForm joinRoom={joinRoom} />
            ) : (
              <>Please login First</>
            )
          }
        />
        <Route
          path={paths.messenger}
          element={
            connection &&
            userDetails && (
              <MessageContainer
                messages={messages}
                sendMessage={sendMessage}
                closeConnection={closeConnection}
              />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
