const express = require('express')
const router = express.Router()
const fbloginController = require('../controllers/fbloginController')

router.post('/', fbloginController.login)

module.exports = router