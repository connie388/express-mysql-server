var express = require("express");
var router = express.Router();

// Require controller modules.
var menu_category_controller = require("../controller/menuCategoryController");

// get
//http://localhost:4000/order/v1.0.0/order/menucategory
router.get("/order/menucategory", menu_category_controller.findAll);
router.get("/order/menucategory/:id", menu_category_controller.findById);
router.post("/order/menucategory", menu_category_controller.create);
router.put("/order/menucategory/:id", menu_category_controller.update);
router.delete("/order/menucategory/:id", menu_category_controller.delete);

module.exports = router;
