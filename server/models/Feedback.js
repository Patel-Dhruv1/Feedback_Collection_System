const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
