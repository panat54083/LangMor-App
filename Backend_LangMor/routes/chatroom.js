const router = require('express').Router()
const { catchErrors } = require("../handler/errorHandler")
const chatroomController = require("../controllers/chatroomController")

router.post('/create', catchErrors(chatroomController.createChatroom))
router.post('/closed', catchErrors(chatroomController.closeChatroom))

module.exports = router