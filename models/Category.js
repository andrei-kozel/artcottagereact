const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: 1
  }
});

module.exports = Category = mongoose.model("category", CategorySchema);
