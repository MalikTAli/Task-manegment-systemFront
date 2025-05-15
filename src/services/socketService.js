// services/socketService.js
import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId) => {
  socket = io("http://localhost:4000", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Connected to socket.io");
    socket.emit("register", userId); // تسجيل المستخدم
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket.io");
  });
};

export const sendMessageSocket = ({ toUserId, message, fromUserId }) => {
  if (socket) {
    socket.emit("chat message", { toUserId, message, fromUserId });
  }
};

export const receiveMessageSocket = (callback) => {
  if (socket) {
    socket.on("chat message", (data) => {
      callback(data);
    });
  }
};
