const router = require("express").Router()
const {catchErrors} = require("../handler/errorHandler")
const orderController = require("../controllers/orderController")

router.post("/save", catchErrors(orderController.saveOrder))
router.get("/get", catchErrors(orderController.getOrder))

module.exports = router