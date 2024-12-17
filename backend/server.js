const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const offerRoutes = require('./routes/offers');
const userRoutes = require('./routes/users');

dotenv.config();  // ensure dotenv is loaded **FIRST** before any of it is called later down in file 
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/offers', offerRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));