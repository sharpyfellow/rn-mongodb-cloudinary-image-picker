const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/profiles', require('./routes/profileRoutes'));
app.use("/api/v1/post", require("./routes/postRoutes"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
 
})
.then(() => {
  console.log('DB Connected');
})
.catch((err) => {
  console.error('DB Connection Error:', err);
});

// Start the server
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});