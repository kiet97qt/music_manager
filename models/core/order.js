const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * status: 
 * 0:  Basket hasn't created 
 * 1:  Basket has created
 * 2:  Customer has confirmed. Basket => Order Draft
 * 3:  Admin has confirmed. Order Draft => Order Official (Order)
 * 99:  Order was cancelled by Admin.
 */
const userOrder = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'users' },
    status: { type: Number, default: 0 },
    nameSender: { type: String, default: "" },
    mailSender: { type: String, default: "" },
    addressSender: { type: String, default: "" },
    phoneNumberSender: { type: String, default: "" },
    nameReceiver: { type: String, default: "" },
    addressReceiver: { type: String, default: "" },
    phoneNumberReceiver: { type: String, default: "" },
    products: [{
        productID: {type: Schema.Types.ObjectId,  ref: 'products'},
        quantity:{ type: Number, default: 0 }
    }],
    totalAmount: { type: Number, default: 0 },
    history: { type: Object, default: "" }
});

const orders = mongoose.model("orders", userOrder);
module.exports = {orders};
