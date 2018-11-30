const hubbleController = require('../controllers/hubble')
const router = require('express').Router()

router.get('/', hubbleController.imagesList)
router.get('/launches', hubbleController.launches)
router.get('/details/:id', hubbleController.imageDetails)

module.exports = router