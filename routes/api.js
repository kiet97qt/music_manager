const router = require("express").Router();
const ProductController = require("../controllers/ProductController");

router.get("/search", ProductController.search);

module.exports = router;
