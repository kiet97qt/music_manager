const { decodeToken, encodeToken } = require("./hash");
const MidAdmin = require("../middlewares/AdminMiddleware");
const MidUser = require("../middlewares/CustomerMiddleware");

const isAdminAuth = (req, res, next) =>
  decodeToken(req,res).then((data) =>
    MidAdmin.getDetail(data.id).then((admin) => {
      if (!admin) {
        res.status(401).json({ message: "permision denied" });
        return;
      }
      req.user_id = admin._id;
      next();
    })
  );

const isCustomerAuth = (req, res, next) =>
  decodeToken(req,res).then((data) =>
    MidUser.getProfile(data.id).then((user) => {
      if (!user) {
        res.status(401).json({ message: "permision denied" });
        return;
      }
      req.user_id = user._id;
      next();
    })
  );

module.exports = {
  isCustomerAuth,
  isAdminAuth,
};
