const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env file

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB setup
const mongoURI = process.env.mongoURL;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Sample route to process data
app.post('/process-text', (req, res) => {
    let { text } = req.body;
    let truncatedText = text.split(/\s+/).slice(0, 100).join(' ');
    res.json({ truncatedText });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
