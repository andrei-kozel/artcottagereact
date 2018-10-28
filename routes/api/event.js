const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Category model
const Event = require("../../models/Event");

// Validation
const validateEventInput = require("../../validation/event");

// @route   GET api/event/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Event Works" });
});

// @route   GET api/event
// @desc    Get event
// @access  Public
router.get("/", (req, res) => {
  Event.find()
    .then(event => res.json(event))
    .catch(err => res.status(404).json({ noeventfound: "No event found" }));
});

// @route   POST api/category
// @desc    Create Category
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const newEvent = new Event({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      adress: req.body.adress
    });

    newEvent.save().then(event => res.json(event));
  }
);

// @route   POST api/event/:event_id
// @desc    Edit event
// @access  Private
router.post(
  "/:event_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const eventFields = {};
    if (req.body.name) eventFields.name = req.body.name;
    if (req.body.description) eventFields.description = req.body.description;
    if (req.body.date) eventFields.date = req.body.date;
    if (req.body.adress) eventFields.adress = req.body.adress;

    Event.findById(req.params.event_id).then(event => {
      if (event) {
        Event.findOneAndUpdate(
          { _id: req.params.event_id },
          { $set: eventFields },
          { new: true }
        ).then(event => {
          res.json(event);
        });
      } else {
        new Event(eventFields).save().then(event => res.json(event));
      }
    });
  }
);

module.exports = router;
