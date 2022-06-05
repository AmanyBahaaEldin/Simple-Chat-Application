import io from "socket.io-client";
import { useState, useEffect } from "react";
import "./App.css";

const URL = "http://localhost:3000";
const socket = io(URL);

function SimpleChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("new-message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    socket.emit("message", message);
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter Your message"
            required
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></input>
        </div>
      </form>
      <section>
        <div>
          <h2>Messages</h2>
          <ul>
            {messages.map((m, i) => (
              <li key={i}>
                {messages.length}
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default SimpleChat;
