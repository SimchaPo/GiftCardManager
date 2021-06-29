import { createContext, useContext, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const socketContext = createContext();

export function ProvideSocket({ children }) {
  const socket = useProvideSocket();
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
}

export const useSocket = () => {
  return useContext(socketContext);
};

const SOCKET_SERVER_URL = "http://localhost:5000";

function useProvideSocket() {
  const socketRef = useRef();
  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Sends a message to the server that
  // forwards it to all users in the same room

  return { socketRef };
}

export default useSocket;
