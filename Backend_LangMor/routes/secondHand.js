const router = require('express').Router()
const { catchErrors } = require("../handler/errorHandler")
const secondHandController = require("../controllers/secondHandController")

router.post("/create", catchErrors(secondHandController.createSecondHand))

module.exports = router