import { createContext, useContext, useEffect, useState } from "react";
import date from "date-and-time";
import { showNotification } from "../swDev";
import useSocket from "./useSocket";
import { useAuth } from "./use-auth";

const chatContext = createContext();

export function ProvideChat({ children }) {
  const chat = useProvideChat();
  return <chatContext.Provider value={chat}>{children}</chatContext.Provider>;
}

export const useChat = () => {
  return useContext(chatContext);
};

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

function useProvideChat() {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const [countNewMessages, setCountNewMessages] = useState(0);
  const { socketRef } = useSocket();
  useEffect(() => {
    console.log("socketRef", socketRef);
    socketRef.current?.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      console.log("countNewMessages", countNewMessages);

      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
      !incomingMessage.ownedByCurrentUser && showNotification(message);
    });
  }, [socketRef.current]);
  useEffect(() => {
    messages.length > 0 && setCountNewMessages(countNewMessages + 1);
  }, [messages]);

  const sendMessage = (messageBody) => {
    const now = new Date();
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      senderName: user.userName,
      sendTime: date.format(now, "HH:mm"),
    });
  };

  return { messages, sendMessage, countNewMessages, setCountNewMessages };
}

export default useChat;
