const router = require('express').Router()
const NasaController = require('../controllers/nasaController')

router.get('/image', NasaController.getImage)
router.get('/apod', NasaController.apod)
router.get('/mars', NasaController.mars)
router.get('/search', NasaController.search)



module.exports = router