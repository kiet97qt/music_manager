const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId},
  name: { type: String, default: "" },
  singer: { type: String, default: ""},
  genre: { type: String, default: ""},
  link: { type: String, default: ""},
  additional: {type: String, default: ""}
  },
  { timestamps: true},
);

const Songs = mongoose.model("Songs", songSchema);

module.exports = {Songs};
