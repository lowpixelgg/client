import { createContext } from "react";
import io from "socket.io-client";

export const socket = io("localhost:3030", {
  query: {
    id: 'frontend'
  },
  transports: ["websocket"],
});


socket.emit('onFrontendConnect', 'frontnend')

export const SocketContext = createContext({});