const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, require: true, default: "USER" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", schema);
