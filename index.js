const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
app.use(express.json())
const userRouters = require("./routes/user.route")


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRouters)

// Sample protected route with JWT
const jwt = require('jsonwebtoken');
app.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: 'Protected data accessed', user: decoded });
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
});

// Public route
app.get('/', (req, res) => {
    res.send('Hello from Express with Mongo, JWT, CORS, etc!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));