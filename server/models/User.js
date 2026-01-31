const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    city: { type: String },
    profilePhoto: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    isBlocked: { type: Boolean, default: false },
    role: { type: String, default: 'user' } // 'user' or 'admin'
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
