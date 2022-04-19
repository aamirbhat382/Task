import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import './App.css';
const socket = io("https://3380-aamirbhat382-task-anbrepajm51.ws-us40.gitpod.io/");
// socket.on("connect", () => {
//   socket.emit('join', `busX019132`)
// });


function Test() {
  const [chat, setChat] = useState([]);

  

  useEffect(() => {
    socket.on('busX019132', (payload) => {
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
              {payload}
            </p>
          );
        })}

    </p>
      </header>
    </div>
  );
}

export default Test;
