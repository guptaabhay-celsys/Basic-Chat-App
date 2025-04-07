const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

const chatsFile = './chats.json';

if (!fs.existsSync(chatsFile)) {
  fs.writeFileSync(chatsFile, JSON.stringify([]));
}

app.post('/save-messages', (req, res) => {
  try {
    const { chatId, newMessage } = req.body;

    const data = fs.readFileSync(chatsFile, 'utf-8');
    const chats = data ? JSON.parse(data) : [];
    const chatIndex = chats.findIndex(chat => chat.chatId === chatId);

    if (chatIndex !== -1) {
      chats[chatIndex].messages.push(newMessage);
    } else {
      chats.push({
        chatId,
        messages: [newMessage],
      });
    }
    fs.writeFileSync(chatsFile, JSON.stringify(chats));
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error(`Error writing to file:`, error);
    res.status(500).json({success: false, error: 'Failed to send message'});
  }
});

app.get('/get-messages', (req, res) => {
  try {
    const data = fs.readFileSync(chatsFile, 'utf-8');
    const chats = data ? JSON.parse(data) : [];
    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.log('Error reading file:', error);
    res.status(500).json({ success: false, error: 'Failed to read messages' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
