const jwt = require("jsonwebtoken");
const { SECRET_KEY, EXPIRES_IN } = require("../constants");
const {products,configs} = require("../models/core/product");

const encodeToken = (jwtData) => {
  return jwt.sign(jwtData, SECRET_KEY, { expiresIn: EXPIRES_IN });
};

const decodeToken = (req,res) => {
  const token = req.headers.authorization;
  if (req.headers && token && token.split(" ")[0] === "Bearer") {
    var jwtToken = req.headers.authorization.split(" ")[1];
    return jwt.verify(
      jwtToken,
      SECRET_KEY,
      { expiresIn: EXPIRES_IN },
      function (err, payload) {
        if (err) {
          return Promise.reject({ message: "Unauthorized user!" });
        } else {
          return Promise.resolve(payload);
        }
      }
    );
  } else {
    res.status(401).json({ message: "Unauthorized user!" });
  }
};

const decodeTokenForgotPassWord = (req,res) => {
  const token = req.body.token;
  if (token) {
    var jwtToken = token;
    return jwt.verify(
      jwtToken,
      SECRET_KEY,
      { expiresIn: EXPIRES_IN },
      function (err, payload) {
        if (err) {
          return Promise.reject({ message: "Unauthorized user!" });
        } else {
          return Promise.resolve(payload);
        }
      }
    );
  } else {
    res.status(401).json({ message: "Unauthorized user!" });
  }
};

const testCode = (req,res) => {
  // products.find({}).populate({ 
  //   path: 'configuration',
  //   }).where('configuration.sound').equals("4 output")
  //   .then((data) =>{
  //       // dùng data sau khi populate rồi mới đem đi filter
  //     res.json(data)
  //   })
  //   .catch((err)=>res.json(err))

  // return products.findOne({name : "Vivo 22 (Chính Hãng)"}).populate({ path: 'configuration'}).
  // exec(function (err, product) {
  //   console.log('The author is: ',product.configuration.body.dimensions);
  // }); {'configuration.body.dimensions': {'$regex' :`${req.body.keyword}`,'$options' : 'i'}}
  products.aggregate([
    { $lookup: {
      "from": configs.collection.name,
      "localField": "_id",
      "foreignField": "_id",
      "as": "configuration"
    }}, 
    {$match : {$or:[
      {name: {'$regex' :`${req.body.keyword}`,'$options' : 'i'}},
      {brand: {'$regex' :`${req.body.keyword}`,'$options' : 'i'}},
      {discount: {'$regex' :`${req.body.keyword}`,'$options' : 'i'}},
      {'configuration.body.dimensions': {'$regex' :`${req.body.keyword}`,'$options' : 'i'}},
      {'configuration.flatform.chipset': {'$regex' :`${req.body.keyword}`,'$options' : 'i'}},
      {'configuration.display.type': {'$regex' :`${req.body.keyword}`,'$options' : 'i'}},
      {'configuration.display.size': {'$regex' :`${req.body.keyword}`,'$options' : 'i'}},
      {description: {'$regex' :`${req.body.keyword}`,'$options' : 'i'}},
    ]}},
    {
      $sort : {createdAt: -1}
    } 
  ])
  .then((data) =>res.json(data))
  .catch((err)=>res.json(err))
};



module.exports = {
  encodeToken,
  decodeToken,
  decodeTokenForgotPassWord,
  testCode
};
