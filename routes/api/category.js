const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Category model
const Category = require("../../models/Category");

// Validation
const validateCategoryInput = require("../../validation/category");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Category Works" });
});

// @route   POST api/category
// @desc    Create Category
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const newCategory = new Category({
      name: req.body.name
    });

    newCategory.save().then(category => res.json(category));
  }
);

module.exports = router;
