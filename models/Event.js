const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Event
const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: 1
  },
  description: {
    type: String,
    required: false,
    unique: 1
  },
  date: {
    type: String,
    required: true,
    unique: 1
  },
  adress: {
    type: String,
    required: true,
    unique: 1
  }
});

module.exports = Event = mongoose.model("event", EventSchema);
