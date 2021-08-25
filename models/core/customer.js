const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  phone: { type: String, default: "" },
  email: { type: String, default: "", index: true },
  password: { type: String, default: "" },
});

const users = mongoose.model("users", userSchema);
module.exports = {users};
