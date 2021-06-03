import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useAuth } from "../authentication/use-auth";
import date from "date-and-time";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:5000";

const useChat = () => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();
  const { user } = useAuth();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    const now = new Date();
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      senderName: user.userName,
      sendTime: date.format(now, "hh:mm"),
    });
  };

  return { messages, sendMessage };
};

export default useChat;
