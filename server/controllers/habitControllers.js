
const Habit = require('../models/Habit')

async function index(req, res) {
    try {
        const habit = await Habit.all
        res.status(200).json(habit)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function show(req, res) {
    try {
        const habit = await Habit.show(req.params.id)
        res.status(200).json(habit)
    } catch (err) {
        res.status(404).json({err})
    }
}

async function showHabits(req, res) {
    try {
        const habits = await Habit.showHabits(req.params.username)
        res.status(200).json(habits)
    } catch (err) {
        res.status(404).json({err})
    }
}


async function create(req, res) {
    try {
        const habit = await Habit.create(req.body)
        res.status(201).json(habit)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function destroy(req, res) {
    try {
        const habit = await Habit.show(req.params.id)
        await habit.destroy()
        res.status(204).end()
    } catch (err) {
        res.status(404).json({err: 'Habit not terminated'})
    }
}

async function count(req, res) {
    try {
        const completed = await Habit.count(req.params.id)

        res.status(201).json(completed)
    } catch (err) {
        res.status(422).json({err: 'Count failed.'})
    }
}

async function getCount(req, res) {
    try {
        const counted = await Habit.getCount(req.params.id)
        res.status(200).json(counted)
    } catch (err) {
        res.status(404).json({err})
    }
}






module.exports = { index, show, create, destroy, showHabits, count, getCount}



