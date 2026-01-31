require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const chatRoutes = require('./routes/chats');
const User = require('./models/User');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);

// Socket.io logic
const users = {}; // userId: socketId

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', async (userId) => {
        users[userId] = socket.id;
        await User.findByIdAndUpdate(userId, { isOnline: true });
        io.emit('userStatus', { userId, isOnline: true });
    });

    socket.on('sendMessage', async (data) => {
        const { sender, receiver, text } = data;
        const newMessage = new Message({ sender, receiver, text });
        await newMessage.save();

        const receiverSocketId = users[receiver];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('receiveMessage', newMessage);
        }
        socket.emit('messageSent', newMessage);
    });

    socket.on('typing', (data) => {
        const { sender, receiver } = data;
        const receiverSocketId = users[receiver];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('displayTyping', { sender });
        }
    });

    socket.on('disconnect', async () => {
        const userId = Object.keys(users).find(key => users[key] === socket.id);
        if (userId) {
            delete users[userId];
            await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
            io.emit('userStatus', { userId, isOnline: false, lastSeen: new Date() });
        }
    });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/user-connect';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));
