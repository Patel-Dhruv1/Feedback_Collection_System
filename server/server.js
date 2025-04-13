// Load environment variables from .env file
require("dotenv").config();

// server.js content follows...

// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize the app
const app = express();

// Use middleware
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.log("❌ MongoDB connection error:", error);
  });

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Feedback Model
const Feedback = mongoose.model("Feedback", feedbackSchema);

app.post("/api/feedback", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send({ message: "Please fill in all fields." });
  }

  const feedback = new Feedback({
    name: name,
    email: email,
    message: message,
  });

  feedback
    .save()
    .then(() => {
      res.status(200).send({ message: "Feedback submitted successfully!" });
    })
    .catch((err) => {
      console.error("Error while saving feedback:", err); // log the error
      res
        .status(500)
        .send({
          message: "Error submitting feedback. Please try again later.",
        });
    });
});
// Endpoint to get all feedbacks
app.get('/api/feedbacks', (req, res) => {
  Feedback.find()
    .then((feedbacks) => {
      res.json(feedbacks);
    })
    .catch((error) => {
      console.error('Error fetching feedbacks:', error);
      res.status(500).json({ error: 'Failed to fetch feedbacks' });
    });
});


// Server Setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

