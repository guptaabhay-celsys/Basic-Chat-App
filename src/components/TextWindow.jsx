import React, { useEffect, useState, useRef } from 'react';
import './TextWindow.css';
import users from '../../backend/users.json';
import connections from '../../backend/connections.json';

const TextWindow = () => {
  const loggedInUserId = "2";
  // console.log(users[loggedInUserId-1].connectionIDs[0]);
  let msgInputRef = useRef(null);
  const primeChatId = connections.filter(conn => conn.user1 === loggedInUserId || conn.user2 === loggedInUserId)[0].chatId;
  // console.log(primeChatId);
  
  const [activeChatId, setActiveChatId] = useState(primeChatId);
  console.log(activeChatId);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [refreshChats, setRefreshChats] = useState(false);
  const [currUser, setCurrUser] = useState({});
  
  let currentTime = new Date().toLocaleTimeString();

  useEffect(() => {
      const fetchChats = async () => {
      const user = users.find(u => u.id === loggedInUserId);
      setCurrUser(user);

      try {
        const res = await fetch('http://localhost:5000/get-messages');
        const data = await res.json();
  
        if (data.success) {
          setChatMessages(data.chats);
        }
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };
  
    fetchChats();
  }, [loggedInUserId, refreshChats]);  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (messageInput.trim() === '') return;

    const newMessage = {
      msgId: Date.now().toString(),
      msgContent: messageInput,
      senderId: loggedInUserId,
      sent_at: currentTime
    };

    const res = await fetch('http://localhost:5000/save-messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: activeChatId,
        newMessage: newMessage
      })
    });

    if (res.ok) {
      setRefreshChats(prev => !prev)
      setMessageInput("");
    } else {
      console.error("Failed to send the message.");
    }
  };

  console.log(chatMessages);
  // console.log(activeChatId);
  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="admin-header">Welcome {currUser.name}!</div>
        <div className="admin-email">{currUser.email}</div>
        <div className="user-list">
          {users.filter(user => user.id !== loggedInUserId).map((user) => (
            <div
              key={user.id}
              className={`user-item ${activeChatId === connections.find(conn => (conn.user1 === loggedInUserId || conn.user2 === loggedInUserId) && (conn.user2 === user.id || conn.user1 === user.id) )?.chatId ? 'active' : ''}`}
              onClick={() => {
                const selectedChat = connections.find(conn =>
                  (conn.user1 === loggedInUserId && conn.user2 === user.id) ||
                  (conn.user2 === loggedInUserId && conn.user1 === user.id)
                );
                setActiveChatId(selectedChat?.chatId);                
              }}
            >
              {user.name}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-window">
        <div className="messages">
          {chatMessages
            .filter(chat => chat?.chatId === activeChatId)
            .map((chat) =>
              chat.messages.map((msg) => (
                <div key={msg.msgId} className={msg.senderId === loggedInUserId ? "message-right" : "message-left"}>
                  <span>{msg.msgContent}</span>
                  <p className="message-info">
                    Sent by {users.find(u => u.id === msg.senderId).name} at {msg.sent_at}
                  </p>
                </div>
              ))
            )}
        </div>

        <form onSubmit={handleFormSubmit} className="message-form">
          <input
            type="text"
            ref={msgInputRef}
            placeholder="Type your message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            required
            className="message-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default TextWindow;