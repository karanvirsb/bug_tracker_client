import io from "socket.io-client";

const socket = io("http://localhost:8000", {
    reconnectionAttempts: 5,
    closeOnBeforeunload: true,
});

export default socket;
