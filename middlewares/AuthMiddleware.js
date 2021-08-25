const adminModel = require("../models/core/admin");
const MidCustomer = require("./CustomerMiddleware");
const MidAdmin = require("./AdminMiddleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { encodeToken } = require("../utils/hash");
const { SECRET_KEY, EXPIRES_IN } = require("../constants");
const mongoose = require("mongoose");

// User
const login = ({ email, password }) => {
  return MidCustomer.getUserByEmail(email).then((user) => {
    if (!user) {
      return Promise.reject("Email doesn't exist!!");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return Promise.reject("Password is not correct!");
    }
    const jwtData = {
      id: user._id,
    };
    const result = {
      token: encodeToken(jwtData),
      ...user._doc,
    };
    return result;
  });
};

async function register(data){
  const { password, email, phone} = data;
  const userID = new mongoose.Types.ObjectId();
  await MidCustomer.getUserByEmail(email).then((user) => {
    if (user) {
      return Promise.reject("Email already exist!!");
    }
  });
  const newUser = {
    _id: userID,
    email,
    phone,
    password: bcrypt.hashSync(password, 10),
  };
  return await MidCustomer.create(newUser);
};
// admin
const loginAdmin = ({ email, password }) => {
  // const newAdmin = {
  //   email,
  //   password: bcrypt.hashSync(password, 10),
  // };
  // return adminModel.create(newAdmin);

  return MidAdmin.getAdminByEmail(email)
    .then((admin) => {
      if (!admin) {
        return Promise.reject("Admin Account doesn't exist!!");
      }
      if (!bcrypt.compareSync(password, admin.password)) {
        return Promise.reject("Password is not correct!");
      }
      const jwtData = {
        id: admin._id,
      };
      const result = {
        token: encodeToken(jwtData),
        ...admin._doc,
      };
      return result;
    })
    .catch((err) => {
      throw new Error("err: ", err);
    });
};
module.exports = {
  login,
  register,
  loginAdmin,
};
