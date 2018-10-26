const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const cloudinary = require("cloudinary");
const formidable = require("express-formidable");
const keys = require("../../config/keys");

// Post model
const Product = require("../../models/Product");
// const Category = require("../../models/Category");
// Validation
const validateProductInput = require("../../validation/product");

cloudinary.config({
  cloud_name: keys.cloudname,
  api_key: "124555923956956",
  api_secret: "Jn3h5_Jex7R7_ruYC6hjQgetdZ4"
});

// @route   POST api/products/uploadimage
// @desc    Upload image to cloudinary
// @access  Private
router.post(
  "/uploadimage",
  passport.authenticate("jwt", { session: false }),
  formidable(),
  (req, res) => {
    cloudinary.uploader.upload(
      req.files.file.path,
      result => {
        res.status(200).send({
          public_id: result.public_id,
          url: result.url
        });
      },
      {
        public_id: `${Date.now()}`,
        resource_type: "auto"
      }
    );
  }
);

// @route   GET api/products/removeimage
// @desc    Remove image from cloudinary
// @access  Private
router.get(
  "/removeimage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let image_id = req.query.public_id;

    cloudinary.uploader.destroy(image_id, (error, result) => {
      if (error) return res.json({ succes: false, error });
      res.status(200).send("ok");
    });
  }
);

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(product => res.json(product))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/products/:id
// @desc    Get posts by id
// @access  Public
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        res
          .status(404)
          .json({ noproductfound: "No product found with that ID" });
      }
    })
    .catch(err => res.status(404).json({ nopostfound: "No post found" }));
});

// @route   POST api/products
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProductInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const newProduct = new Product({
      title: req.body.title,
      technique: req.body.technique,
      size: req.body.size,
      material: req.body.material,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      available: req.body.available,
      images: req.body.images,
      likes: req.body.likes,
      comments: req.body.comments
    });

    newProduct.save().then(product => res.json(product));
  }
);

// @route   POST api/products/:product_id
// @desc    Edit product
// @access  Private
router.post(
  "/:product_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProductInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const productFields = {};
    if (req.body.title) productFields.title = req.body.title;
    if (req.body.technique) productFields.technique = req.body.technique;
    if (req.body.size) productFields.size = req.body.size;
    if (req.body.material) productFields.material = req.body.material;
    if (req.body.description) productFields.description = req.body.description;
    if (req.body.price) productFields.price = req.body.price;
    if (req.body.category) productFields.category = req.body.category;
    if (req.body.available) {
      productFields.available = req.body.available;
    } else {
      productFields.available = false;
    }
    if (req.body.images) productFields.images = req.body.images;
    if (req.body.likes) productFields.likes = req.body.likes;
    if (req.body.comments) productFields.comments = req.body.comments;

    Product.findById(req.params.product_id).then(product => {
      if (product) {
        Product.findOneAndUpdate(
          { _id: req.params.product_id },
          { $set: productFields },
          { new: true }
        ).then(product => {
          res.json(product);
        });
      } else {
        new Product(productFields).save().then(product => res.json(product));
      }
    });
  }
);

// @route   DELETE api/products/:product_id
// @desc    Delete product
// @access  Private
router.delete(
  "/:product_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.product_id).then(product => {
      if (product) {
        product
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch(err =>
            res.status(404).json({ nopostfound: "No product found" })
          );
      } else {
        res.status(404).json({ nopostfound: "No product found" });
      }
    });
  }
);

module.exports = router;
