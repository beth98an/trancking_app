const express = require('express')
const router = express.Router()

const habitControllers = require('../controllers/habitControllers')

router.get('/', habitControllers.index)
router.get('/:id', habitControllers.show)
router.get('/find/:username', habitControllers.showHabits)
router.post('/', habitControllers.create)
router.delete('/:id', habitControllers.destroy)

module.exports = router
