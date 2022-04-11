const express = require('express')
const router = express.Router()

const userControllers = require('../controllers/userControllers')

router.get('/', userControllers.index)
router.get('/:user_id', userControllers.show)
router.post('/', userControllers.create)
router.delete('/:user_id', userControllers.destroy)

module.exports = router
