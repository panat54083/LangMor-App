const router = require('express').Router()
const { catchErrors } = require("../handler/errorHandler")
const secondHandController = require("../controllers/secondHandController")

router.post("/create", catchErrors(secondHandController.createSecondHand))
router.get("/getMyPosts", catchErrors(secondHandController.getMySecondHandsPosts))

module.exports = router