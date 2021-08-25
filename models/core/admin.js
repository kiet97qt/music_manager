const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: { type: String, default: "", index: true },
  password: { type: String, default: "" },
});

const Admins = mongoose.model("admins", AdminSchema);
module.exports = Admins;
