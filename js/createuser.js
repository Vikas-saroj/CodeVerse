// createUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();  // to load environment variables

const dbUri = process.env.DB_URI;  // MongoDB connection string from .env file

mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);

const createUser = async () => {
    try {
        const hashedPassword = await bcrypt.hash('test1234', 10);
        const user = new User({ email: 'test@example.com', password: hashedPassword });
        await user.save();
        console.log('User created');
    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        mongoose.disconnect();
    }
};

createUser();
