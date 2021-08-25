const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId},
  name: { type: String, default: "" },
  brand: { type: String, default: ""},
  discount: { type: String, default: ""},
  configuration: { type: Schema.Types.ObjectId, ref: 'configs' },
  description: { type: String, default: "" },
  cost: { type: Number, default: 0 },
  },
  { timestamps: true},
);
productSchema.plugin(mongoose_delete,{
  deletedAt: true,
  overrideMethods: 'all'
});
const configSchema = Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'products' },
  body: {dimensions: { type: String, default: ""}, weight:{type: String, default: ""}},
  display:{type: { type: String, default: ""},size:{type: String, default: ""}},
  flatform: [{os: { type: String, default: ""},chipset: { type: String, default: ""}}],
  sound:{type: String, default: ""},
});
configSchema.plugin(mongoose_delete,{
  deletedAt: true,
  overrideMethods: 'all'
});
const products = mongoose.model("products", productSchema);
const configs = mongoose.model("configs", configSchema);

module.exports = {products,configs};
