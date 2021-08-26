const router = require('express').Router()
const song = require('./song')

router.use('/song', song)

module.exports = router
