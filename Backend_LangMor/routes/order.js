const router = require("express").Router()
const {catchErrors} = require("../handler/errorHandler")
const orderController = require("../controllers/orderController")

router.post("/save", catchErrors(orderController.saveOrder))
module.exports = router