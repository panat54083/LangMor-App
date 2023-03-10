const router = require('express').Router()
const {catchErrors} = require("../handler/errorHandler")
const settingController = require("../controllers/settingController")

router.post("/sendReport", catchErrors(settingController.sendReport))

module.exports = router
