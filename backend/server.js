const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');

// Load env vars

dotenv.config();

// Set default JWT secret if not provided
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'default_jwt_secret_change_in_production';
}

// Create app

const app = express();

// Middleware

app.use(cors());

app.use(express.json());

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/olxproject')

  .then(() => console.log('MongoDB connected'))

  .catch(err => console.log(err));

// Routes

app.use('/api/auth', authRoutes);

// Health check for performance monitoring

app.get('/api/health', (req, res) => {

  res.json({ status: 'OK' });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {

  console.log(`Server running on port ${PORT}`);

});

// Trigger nodemon restart
// Another trigger
