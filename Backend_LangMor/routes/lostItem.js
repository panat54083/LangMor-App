const router = require('express').Router()
const { catchErrors } = require("../handler/errorHandler")
const lostItemController = require("../controllers/lostItemController")

router.post("/create", catchErrors(lostItemController.createLostItem))

module.exports = router