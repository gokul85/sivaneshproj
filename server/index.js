const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const propRoutes = require('./routes/property');
const { authMiddleware } = require('./middleware/auth');
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

app.use('/api/auth', authRoutes);
app.use('/api/properties', authMiddleware, propRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});