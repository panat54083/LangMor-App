const router = require('express').Router()
const { catchErrors } = require("../handler/errorHandler")
const customerContorller= require('../controllers/customerContorller')

router.post('/login', catchErrors(customerContorller.login))
router.get('/info', catchErrors(customerContorller.userInfo))

module.exports = router;