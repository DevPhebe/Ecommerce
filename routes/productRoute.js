const {Router} = require("express");
const productcontroller = require("../controllers/productcontroller");

const router = Router();

router.get("/products", productcontroller.get_allproducts);
router.post("/product/new", productcontroller.post_product);

router.get("/product/:id", productcontroller.get_singleProduct);
router.put("/product/:id", productcontroller.edit_singleProduct);

router.delete("/product/:id", productcontroller.delete_product);

module.exports = router;