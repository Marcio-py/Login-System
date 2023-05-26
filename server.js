if (process.env.Node_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const initializePassport = require("./passport-config");
initializePassport(passport, (email) => {
  users.find((user) => user.email === email),
    (id) => users.find((user) => user.id === id);
});

const users = [];

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  (req, res) => {
    console.log(req.body.email, req.body.password);
  }

  // passport.authenticate("local", {
  //   successRedirect: "/",
  //   failureRedirect: "/login",
  //   failureFlash: true,
  // })
);

app.get("/signup", (req, res) => {
  res.render("signUp.ejs");
});

app.post("/signup", async (req, res) => {
  try {
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.redirect("/login");
  } catch (error) {
    res.redirect("/signup");
  }
  console.log(users);
});

app.listen(3000);
