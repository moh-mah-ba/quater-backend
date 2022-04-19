require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/users");

require("./config/passport")(passport); 

mongoose.connect(process.env.CONNECTION_SETTING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () =>
  console.log("connected to DB GO")
);

app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
}));


app.use(session({ secret: "secretcode", resave: false, saveUninitialized: false }));
app.use(cookieParser("secretcode"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.send("sever is ready");
  });

  app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
  });
  