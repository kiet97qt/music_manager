const MidCustomer = require("../middlewares/CustomerMiddleware");

const getProfile = (req, res) =>{
  MidCustomer.getProfile(req.user_id)
    .then((data) => res.json({ data }))
    .catch((err) => res.json({ err }));
}

const changeForgotPassword = (req, res) =>{
  MidCustomer.changeForgotPassword(req,res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
}

const createOrder = (req, res) =>{
  MidCustomer.createOrder(req,res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
}

const getOrder = (req, res) =>{
  MidCustomer.getOrder(req,res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
}

const addProducts = (req, res) =>{
  MidCustomer.addProducts(req,res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
}

const updateBasket = (req, res) =>{
  MidCustomer.updateBasket(req,res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
}

const orderComfirmedByCustomer = (req, res) =>{
  MidCustomer.orderComfirmedByCustomer(req,res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
}

const deleteProducts = (req, res) =>{
  MidCustomer.deleteProducts(req,res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
}

module.exports = { 
  getProfile,
  changeForgotPassword,
  createOrder,
  getOrder,
  addProducts,
  updateBasket,
  orderComfirmedByCustomer,
  deleteProducts,
 };
