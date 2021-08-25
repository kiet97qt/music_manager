const {orders} = require("../models/core/order");
const {products,configs} = require("../models/core/product");

const getBasket = (user_id)=> {
    return orders.findOne({userID: user_id, status: 1});
}

const getOrder = (user_id,status)=> {
    return orders.find({userID: user_id, status: status});
}

const getOrderByConditions = (conditions)=> {
    return orders.find(conditions);
}

const countTotalAmount = (user_id) =>{
    return orders.aggregate([
        {
            $match: { 
                userID: user_id,
                status: 1
            }
        },
        { "$unwind": {
            path: "$products", 
            preserveNullAndEmptyArrays: true 
        }},
        {
            $lookup:{
              "from": products.collection.name,
              "localField": "products.productID",
              "foreignField": "_id",
              "as": "products.productID"
            }
        },
        { "$unwind": {
            path: "$products.productID", 
            preserveNullAndEmptyArrays: true 
        }},
        {
            $project:{
                userID:1,
                total: { $multiply: [ "$products.productID.cost", "$products.quantity" ] }
            },
        },
        {
            $group:{
              _id: "$userID",
              totalAmount: {$sum:"$total"}
            }
        },  
    ])
}

const checkQuantityProduct = (products)=> {
    return products.filter((product)=>{ 
        return product.quantity > 0;
    });
}
const findOrderById = (id) => orders.findById(id);

const create = (newOrder) => orders.create(newOrder);

const findOrderAndUpdate = (id, status)=> orders.findOneAndUpdate({_id: id},{status},{new:true });

module.exports = { 
    getBasket, 
    getOrder,
    create,
    countTotalAmount,
    checkQuantityProduct,
    findOrderAndUpdate,
    getOrderByConditions,
    findOrderById,
};
