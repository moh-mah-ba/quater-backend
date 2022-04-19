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

// router.post("/login" , (req , res , next) => {
//   passport.authenticate("local" , (err , user , info) => {
//     if (err) throw err;
//     if (!user) res.send("No User Exists");
//     else{
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         res.send("Successfully Authenticated");
//         console.log(req.user);
//       })
//     }
//   })(req , res , next);
// })


  router.post("/signout", function (req, res) {
    req.logout();
  });

module.exports = router;
