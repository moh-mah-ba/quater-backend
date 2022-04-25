const express = require("express");
const router = express.Router();
const Joi = require("joi");
const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/", (req, res) => {
  res.send("hello from users");
});

router.post(
    "/login",
    passport.authenticate("local"),
    function (req, res, next) {
      if (req.err) {
        res.status(404).send({ message: "something went wrong" });
      } else {
        res.send(req.user); 
      }
      next();
    }
  );


  router.post("/signout", function (req, res) {
    req.logout();
  });

module.exports = router;
