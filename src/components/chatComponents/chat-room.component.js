import React, { useEffect, useState } from "react";
import useChat from "../../hooks/useChat";
import "./chatcss.css";

const ChatRoom = (props) => {
  const [newMessage, setNewMessage] = useState();
  const { messages, sendMessage, countNewMessages, setCountNewMessages } =
    useChat();

  const handleSubmit = (event) => {
    event.preventDefault();
    newMessage && sendMessage(newMessage);
    setNewMessage(null);
    event.target.reset();
  };
  const scrollToBottom = () => {
    const chat = document.getElementById("chatList");
    chat.scrollTop = chat.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    setCountNewMessages(0);
  }, [countNewMessages, setCountNewMessages]);
  const handleChange = (event) => setNewMessage(event.target.value);
  return (
    <div className="chatWindow">
      <h3>Chat</h3>
      <ul className="chat" id="chatList">
        {messages.map((message, i) => (
          <div key={i}>
            <li
              className={message.ownedByCurrentUser ? "chatself" : "chatother"}
            >
              <div className="chatmsg">
                <p>{message.senderName}</p>
                <div className="chatmessage"> {message.body}</div>
                <time>{message.sendTime}</time>
              </div>
            </li>
          </div>
        ))}
      </ul>
      <div className="chatInputWrapper">
        <form onSubmit={handleSubmit}>
          <input
            className="chattextarea input"
            type="text"
            placeholder="Enter your message..."
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
