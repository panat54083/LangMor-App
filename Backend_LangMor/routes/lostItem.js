const router = require('express').Router()
const { catchErrors } = require("../handler/errorHandler")
const lostItemController = require("../controllers/lostItemController")

router.post("/create", catchErrors(lostItemController.createLostItem))
router.get("/getMyPosts", catchErrors(lostItemController.getMyLostItemsPosts))
router.get("/getAll", catchErrors(lostItemController.getAllLostItems))

module.exports = router