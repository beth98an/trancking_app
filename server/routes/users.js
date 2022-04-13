const express = require('express')
const router = express.Router()

const userControllers = require('../controllers/userControllers')

router.get('/', userControllers.index)
router.get('/:username', userControllers.show)
router.post('/register/', userControllers.create)
router.post('/login/', userControllers.login)
router.delete('/:username', userControllers.destroy)

module.exports = router
