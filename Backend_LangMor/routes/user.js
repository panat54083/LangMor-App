const router = require('express').Router()
const { catchErrors } = require("../handler/errorHandler")
const userController = require('../controllers/userController')

router.post('/login', catchErrors(userController.login))

module.exports = router;