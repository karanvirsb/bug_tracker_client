import io from "socket.io-client";

const socket = io("http://localhost:8000", {
    transports: ["websocket"],
    reconnectionAttempts: 5,
});

socket.on("connection", (socket) => {
    console.log("connected: " + socket);
});

socket.on("disconnect", () => {
    console.log("disconnected");
});

export default socket;
