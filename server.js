const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const app = express();

const users = require("./routes/api/users");
const products = require("./routes/api/products");
const category = require("./routes/api/category");
const event = require("./routes/api/event");

// Utils
const { sendEmail } = require("./utils/mail/index");

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

//===========================
//        EMAIL
//===========================
app.post("/contact", (req, res) => {
  sendEmail(
    req.body.email,
    req.body.name,
    req.body.phone,
    req.body.msg,
    null,
    "request"
  );
  res.status(200).json({
    success: true
  });
});

// Use Routes
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/category", category);
app.use("/api/event", event);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendfile(parh.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
