const User = require('../models/User')
const bcrypt = require('bcryptjs');

async function index(req, res) {
    try {
        const users = await User.all
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function show(req, res) {
    try {
        const user = await User.show(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({err})
    }
}

async function create(req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        await User.create({...req.body, password: hashed})
        res.status(201).json({user})
        } catch (error) {
        res.status(500).json({err})
    }
}

async function login(req, res) {
    try {
        let user = await Users.findByUsername(req.body.username) 
        if (!user) {
            throw new Error('No user with this username')
        }
        const passwordCheck = bcrypt.compare(req.body.password, user.password)
        if (passwordCheck) {
            res.status(200).json({ user: user.username})
        } else {
            throw new Error('User could not be authenticated')
        }
     } catch (err) {
         res.status(401).json({err: 'Username or Password incorrect!'})
     }
 }


async function destroy(req, res) {
    try {
        const user = await User.show(req.params.id)
        await user.destroy()
        res.status(204).end()
    } catch (err) {
        res.status(404).json({err})
    }
}

module.exports = { index, create, show, destroy, login }


