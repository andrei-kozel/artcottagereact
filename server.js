const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

const users = require("./routes/api/users");
const products = require("./routes/api/products");
const category = require("./routes/api/category");

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use("/static", express.static(__dirname + "./client/public"));

// DB Config
const db = require("./config/keys").mongoURL;
// Connect to MongoDB
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
mongoose.set("useCreateIndex", true);

// Passport middlewear
app.use(passport.initialize());

// Passport Config
require("./config/passport.js")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/category", category);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
