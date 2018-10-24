const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    technique: {
      required: false,
      type: String
    },
    size: {
      required: false,
      type: String
    },
    material: {
      required: false,
      type: String
    },
    description: {
      required: false,
      type: String
    },
    price: {
      required: false,
      type: Number
    },
    category: {
      required: false,
      type: String
    },
    available: {
      required: false,
      type: Boolean
    },
    images: {
      type: Array,
      default: []
    },
    likes: [],
    comments: [
      {
        name: {
          type: String,
          required: true
        },
        text: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("product", ProductSchema);
