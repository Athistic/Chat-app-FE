import { useEffect, useRef } from 'react';
import MessageInputForm from '../message-input-form';
import { MessageContainerProps } from './interfaces';

const MessageContainer = (props: MessageContainerProps) => {
  const { messages, sendMessage, closeConnection } = props;

  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-blue-100 via-sky-200 to-cyan-100">
      <div className="flex justify-end mb-4">
        <button
          className="bg-red-500 text-white p-2 rounded-lg shadow-md"
          onClick={closeConnection}
        >
          Leave
        </button>
      </div>

      <div
        ref={messageRef}
        className="flex flex-col gap-4 overflow-auto max-h-[80vh] p-6 bg-white/60 rounded-xl shadow-xl backdrop-blur-lg border border-blue-300/30 flex-grow"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-white/80 rounded-lg shadow-md backdrop-blur-sm"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full text-white flex items-center justify-center font-semibold shadow-sm">
                {message.user[0].toUpperCase()}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-sky-700">{message.user}</span>
              <p className="text-gray-800">{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-shrink-0">
        <MessageInputForm sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default MessageContainer;
