import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import './App.css';
const socket = io("https://3380-aamirbhat382-task-anbrepajm51.ws-us40.gitpod.io/");
// socket.on('connect', function() {
//   socket.emit('join', 'busX019132'); //chat room id unique to two users
// });

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit('join', 'busX019132');
    setMessage("");
  };

  useEffect(() => {
    socket.on("sendData", (payload) => {
      console.log(payload)
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
      <p>
      <h1>Chatty app</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>
              {payload.message}
            </p>
          );
        })}

        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
    </p>
      </header>
    </div>
  );
}

export default App;
