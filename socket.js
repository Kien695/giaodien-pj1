import { io } from "socket.io-client";
const socketClient = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
  autoConnect: false,
});
export default socketClient;
