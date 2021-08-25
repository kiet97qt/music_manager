const MidAuth = require("../middlewares/AuthMiddleware");

const login = (req, res) =>
  MidAuth.login(req.body)
    .then((data) => res.json({ data }))
    .catch((err) => res.json({ err }));

const register = (req, res) =>
  MidAuth.register(req.body)
    .then((data) => res.json({ data }))
    .catch((err) => res.json({ err }));

const loginAdmin = (req, res) =>{
  MidAuth.loginAdmin(req.body)
    .then((data) => res.json({ data }))
    .catch((err) => res.json({ err }));
}

const forgotPassword = (req, res) =>{
  // MidAuth.forgotPassword(req.body)
  //   .then((data) => res.json({ data }))
  //   .catch((err) => res.json({ err }));
}
module.exports = {
  login,
  register,
  loginAdmin,
  forgotPassword,
};
