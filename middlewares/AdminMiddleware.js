const adminModel = require("../models/core/admin");
const getAdminByEmail = (email) => adminModel.findOne({ email });
const getDetail = (_id) => adminModel.findById(_id);
const {sendMailFromAdmin} = require("../utils/commons")
const MidCustomer = require("../middlewares/CustomerMiddleware");
const {encodeToken,decodeToken} = require("../utils/hash");
const MidOrder = require("./OrderMiddleware");

function sendMailForgotPassword(req,res){
    return MidCustomer.getUserByEmail(req.body.email)
      .then((user) => {
        if(!user){
          res.json("Email is not Exist");
        }
        const jwtData = {
          email: req.body.email,
          password: user.password
        };
        const mailOptions = {
          from: 'kietnodejs1997@gmail.com',
          to: req.body.email,
          subject: '[Moblie-Store] Email Restore Password',
          text: `Click at this link for changing your password: http://localhost:3000/customer/changePassword?token=${encodeToken(jwtData)}`
        };
        return sendMailFromAdmin(mailOptions)
            .then((data) => Promise.resolve(data))
            .catch((err) => Promise.reject(err))
      })
      .catch((err) => res.json("Email is not Exist: ",err))
}
async function orderComfirmedByAdmin(req,res) {
  const order = await MidOrder.findOrderById(req.body._id);
  if(order.status !== 2) {
    return Promise.reject("Order unavailable!!");
  }
  return await MidOrder.findOrderAndUpdate(req.body._id,3);
}

async function getOrder(req,res) {
  let orders = await MidOrder.getOrderByConditions(req.query);
  if(Array.isArray(orders) && orders.length){
      return orders
  } 
  switch(parseInt(req.query.status)){
      case 1:
          return "Basket isn't exist!";
      case 2:
          return "No Confirmed Orders by Customer Availble";
      case 3:
          return "No Confirmed Orders by Administrator Availble";
      default:
          return "Status Wrong!";
  }  
}

module.exports = { 
  getAdminByEmail, 
  getDetail,
  sendMailForgotPassword,
  orderComfirmedByAdmin,
  getOrder,
 };
