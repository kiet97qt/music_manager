const ProductCustomer = require("../middlewares/ProductMiddleware");

const create = (req, res) => {
  ProductCustomer.create(req.body)
    .then((data) => res.json({ data }))
    .catch((err) => res.json({ err }));
};
const destroy = (req, res) => {
  ProductCustomer.destroy(req)
    .then((data) => res.json("Delete Product Successfully!"))
    .catch((err) => res.json({ err }));
};
const forceDestroy = (req, res) => {
  ProductCustomer.forceDestroy(req)
    .then((data) => res.json("Force Destroy Product Successfully!"))
    .catch((err) => res.json({ err }));
};
const modify = (req, res) => {
  ProductCustomer.modify(req,res)
    .then((data) => res.json({ message: "Modified Successfully!", data }))
    .catch((err) => res.json({ err }));
};

const restore = (req, res) => {
  ProductCustomer.restore(req)
    .then((data) => res.json("Restore Product Successfully!"))
    .catch((err) => res.json({ err }));
};

const search = (req, res) => {
  ProductCustomer.search(req)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
  }

module.exports = { create, destroy, modify, forceDestroy, restore,search};
