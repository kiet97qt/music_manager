const {users} = require("../models/core/customer");
const {orders} = require("../models/core/order");
const {products,configs} = require("../models/core/product");
const bcrypt = require("bcrypt");
const {decodeTokenForgotPassWord} = require("../utils/hash");
const ObjectId = require('mongoose').Types.ObjectId
const MidOrder = require("./OrderMiddleware");
const getUserByEmail = (email) => users.findOne({ email});
const create = (data) => users.create(data);
const getProfile = (user_id) => users.findById(user_id);
function changeForgotPassword(req,res){
    return decodeTokenForgotPassWord(req,res)
        .then((data) => {
            return getUserByEmail(data.email)
                .then((user) => {
                    if (!user) {
                        return Promise.reject("User is not exist!!");
                    }
                    if(data.password === user.password){
                        return users.findOneAndUpdate({ _id: user._id }, {password: bcrypt.hashSync(req.body.newPassword, 10)}, {new: true,
                        })
                        .then((data) => Promise.resolve("Change Password Successfully!",data))
                        .catch((err) => Promise.reject(err))
                    } else{
                    return res.json("Password changed");
                    }
                })
        })
        .catch((err) => res.json(err))
}
async function createOrder(req,res) {
    const { nameSender, mailSender,addressSender, phoneNumberSender,nameReceiver,addressReceiver,phoneNumberReceiver} = req.body;
    let order = await MidOrder.getBasket(req.user_id);
    if(order){
        return Promise.reject("Basket is already exist!!");
    } 
    const newOrder ={
        userID: req.user_id,
        status: 1,
        nameSender,
        mailSender,
        addressSender,
        phoneNumberSender,
        nameReceiver,
        addressReceiver,
        phoneNumberReceiver,
    };  
    return await MidOrder.create(newOrder);
} 

async function getOrder(req,res) {
    let orders = await MidOrder.getOrder(req.user_id,req.query.status);
    if(Array.isArray(orders) && orders.length){
        return orders
    } 
    switch(parseInt(req.query.status)){
        case 1:
            return "Basket isn't exist!";
        case 2:
            return "Order  isn't exist!";
        default:
            return "Status Wrong!";
    }    
} 
async function addProducts(req,res) {
    let order = await MidOrder.getBasket(req.user_id);
    if(!order){
        return Promise.reject("Basket isn't exist!!");
    }
    let productsAdded = await MidOrder.checkQuantityProduct(req.body.products)
    await orders.findOneAndUpdate({userID: req.user_id, status: 1},{$push:{"products" : productsAdded}},{new:true });
    let totalAmount = await MidOrder.countTotalAmount(req.user_id);
     return await orders.findOneAndUpdate({userID: req.user_id, status: 1},{totalAmount: totalAmount[0].totalAmount},{new:true });
}

async function updateBasket(req,res) {
    let order = await MidOrder.getBasket(req.user_id);
    if(!order){
        return Promise.reject("Basket isn't exist!!");
    } 
    req.body.products = MidOrder.checkQuantityProduct(req.body.products)
    await orders.findOneAndUpdate({userID: req.user_id, status: 1},req.body,{new:true });
    let totalAmount = await MidOrder.countTotalAmount(req.user_id);
    return await orders.findOneAndUpdate({userID: req.user_id, status: 1},{totalAmount: totalAmount[0].totalAmount},{new:true });}

async function orderComfirmedByCustomer(req,res) {
    let order = await MidOrder.getBasket(req.user_id);
    if(!order){
        return Promise.reject("Basket isn't exist!!");
    } 
    let history = await orders.findOne({userID: req.user_id, status: 1},{ history: 0}).populate("products.productID")
    return await orders.findOneAndUpdate({userID: req.user_id, status: 1},{history:history, status:2},{new:true });
}

async function deleteProducts(req,res) {
    let order = await MidOrder.getBasket(req.user_id);
    if(!order){
        return Promise.reject("Basket isn't exist!!");
    } 
    await orders.update(
        {userID: req.user_id, status: 1 },
        { $pull: { 'products': { _id: req.body._id } } }
      );
    let totalAmount = await MidOrder.countTotalAmount(req.user_id);
    return await orders.findOneAndUpdate({userID: req.user_id, status: 1},{totalAmount: totalAmount[0].totalAmount},{new:true });
}

module.exports = { 
    create, 
    getUserByEmail, 
    getProfile,
    changeForgotPassword,
    createOrder,getOrder,
    addProducts,
    updateBasket,
    orderComfirmedByCustomer,
    deleteProducts,
};



    // return users.aggregate([
    //     {
    //         $match : { _id: ObjectId(user_id)}
    //     },
    //     { $lookup: {
    //         "from": baskets.collection.name,
    //         "localField": "basket",
    //         "foreignField": "_id",
    //         "as": "basket"
    //     }},
    //     { "$unwind": {
    //         path: "$basket", 
    //         preserveNullAndEmptyArrays: true 
    //     }},
    //     { $lookup: {
    //         "from": products.collection.name,
    //         "localField": "basket.products.productID",
    //         "foreignField": "_id",
    //         "as": "basket.products"
    //     }},
    //     { "$unwind": {
    //         path: "$basket.products", 
    //         preserveNullAndEmptyArrays: true 
    //     }},
    //     { $lookup: {
    //         "from": configs.collection.name,
    //         "localField": "basket.products.configuration",
    //         "foreignField": "_id",
    //         "as": "basket.products.configuration"
    //     }}
    //   ])