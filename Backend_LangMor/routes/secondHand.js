const router = require('express').Router()
const { catchErrors } = require("../handler/errorHandler")
const secondHandController = require("../controllers/secondHandController")

router.post("/create", catchErrors(secondHandController.createSecondHand))
router.get("/getMyPosts", catchErrors(secondHandController.getMySecondHandsPosts))
router.get("/getAll", catchErrors(secondHandController.getAllSecondHands))
router.get("/getOwner", catchErrors(secondHandController.getOwnerData))
router.post("/update", catchErrors(secondHandController.secondHandUpdate))


module.exports = router