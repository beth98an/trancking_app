const express = require('express')
const router = express.Router()

const habitControllers = require('../controllers/habitControllers')

router.get('/', habitControllers.index)
router.get('/:id', habitControllers.show)
router.get('/find/:username', habitControllers.showHabits)
router.post('/:username', habitControllers.create)
router.delete('/:id', habitControllers.destroy)
router.put('/count/:id', habitControllers.count)
router.get('/getcount/:id', habitControllers.getCount)

module.exports = router
