// frontend/src/Chat.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!name || !message) return;
    const msgData = { name, message };
    socket.emit("chat message", msgData);
    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Real-Time Chat App</h2>
      <div>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div style={{ marginTop: "20px" }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.name}: </strong> {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
