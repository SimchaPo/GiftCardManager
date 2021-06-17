import { createContext, useContext, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useAuth } from "../authentication/use-auth";
import date from "date-and-time";
import { showNotification } from "../swDev";

const chatContext = createContext();

export function ProvideChat({ children }) {
  const chat = useProvideChat();
  return <chatContext.Provider value={chat}>{children}</chatContext.Provider>;
}

export const useChat = () => {
  return useContext(chatContext);
};

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:5000";

function useProvideChat() {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();
  const { user } = useAuth();
  const [countNewMessages, setCountNewMessages] = useState(0);
  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      console.log("socketRef.current", socketRef.current.sockets);
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
      setCountNewMessages(countNewMessages + 1);
      showNotification(message);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [countNewMessages]);

  // Sends a message to the server that
  // forwards it to all users in the same room
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
