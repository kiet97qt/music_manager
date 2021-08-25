const router = require("express").Router();
const AdminController = require("../controllers/AdminController");
const ProductController = require("../controllers/ProductController");
const AuthController = require("../controllers/AuthController");
const { checkAuthen } = require("../utils/hash");
const { isAdminAuth } = require("../utils/authen");

router.post("/login", AuthController.loginAdmin);

router.post("/product", isAdminAuth, ProductController.create);

router.put("/product", isAdminAuth, ProductController.modify);

router.delete("/product", isAdminAuth, ProductController.destroy);

router.patch("/product", isAdminAuth, ProductController.restore);

router.delete("/product/force", isAdminAuth, ProductController.forceDestroy);

router.post("/order/confirm", isAdminAuth, AdminController.confirmOrder);

router.get("/order", isAdminAuth, AdminController.getOrder);


// router.put("/profile", AuthController.updateProfile);
module.exports = router;
