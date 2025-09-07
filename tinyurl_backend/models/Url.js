const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expireAt: {
    type: Date // Optional
  },
  clicks: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Url", urlSchema);
