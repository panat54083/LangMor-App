const router = require('express').Router()
const { catchErrors } = require("../handler/errorHandler")
const chatroomController = require("../controllers/chatroomController")

module.exports = router