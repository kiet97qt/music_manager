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

 if(mongoose.models["Songs"]) {  // Check if the model exists
  module.exports = mongoose.model("Songs"); // If true, only retrieve it
 } else {
  module.exports = mongoose.model("Songs", songSchema); // If false, define it
 }
 
