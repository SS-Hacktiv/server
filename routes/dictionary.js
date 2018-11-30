const router = require('express').Router()
const Controller = require('../controllers/dictionary')

router.get('/:word', Controller.getWord)
router.get('/audio/:word', Controller.getWordAudio)

module.exports = router
