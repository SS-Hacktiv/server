const hubbleController = require('../controllers/hubble')
const router = require('express').Router()

router.get('/', hubbleController.imagesList)

module.exports = router