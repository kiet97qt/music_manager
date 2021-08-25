const MidAdmin = require("../middlewares/AdminMiddleware");

const sendMailForgotPassword = (req, res) =>{
    MidAdmin.sendMailForgotPassword(req,res)
      .then((data) => res.json({ data }))
      .catch((err) => res.json({ err }));
}
const confirmOrder = (req, res) =>{
  MidAdmin.orderComfirmedByAdmin(req,res)
    .then((data) => res.json({ data }))
    .catch((err) => res.json({ err }));
}

const getOrder = (req, res) =>{
  MidAdmin.getOrder(req,res)
    .then((data) => res.json({ data }))
    .catch((err) => res.json({ err }));
}
  
module.exports = {
  sendMailForgotPassword,
  confirmOrder,
  getOrder,
};