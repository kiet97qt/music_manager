const router = require('express').Router()
const customer = require('./customer')
const admin = require('./admin')
const api = require('./api')

router.use('/customer', customer)
router.use('/admin', admin)
router.use('/', api)


module.exports = router
