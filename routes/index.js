const router = require('express').Router()
const song = require('./song')

router.use('/', song)

module.exports = router
