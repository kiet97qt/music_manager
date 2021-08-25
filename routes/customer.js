const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const CustomerController = require("../controllers/CustomerController");
const AdminController = require("../controllers/AdminController");

const MidProduct = require("../middlewares/ProductMiddleware");

const { isCustomerAuth } = require("../utils/authen");
const { checkAuthen,testCode } = require("../utils/hash");

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.get("/profile", isCustomerAuth, CustomerController.getProfile);

router.post("/forgotPassword", AdminController.sendMailForgotPassword);

router.patch("/changeForgotPassword", CustomerController.changeForgotPassword);

router.post("/order",isCustomerAuth, CustomerController.createOrder);

router.get("/order",isCustomerAuth, CustomerController.getOrder);

router.post("/order/products",isCustomerAuth,MidProduct.checkProductExist, CustomerController.addProducts);

router.put("/order",isCustomerAuth, CustomerController.updateBasket);

router.patch("/order",isCustomerAuth, CustomerController.orderComfirmedByCustomer);

router.delete("/order/products",isCustomerAuth, CustomerController.deleteProducts);


router.post("/testCode", testCode);



module.exports = router;
