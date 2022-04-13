const User = require('../models/User')
const bcrypt = require('bcrypt');

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

        const user = await User.findByUsername(req.params.username)

        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({err})
    }
}

async function create(req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        let user = await User.create({...req.body, password: hashed})
        res.status(201).json({user})
    } catch (err) {
        res.status(422).json({err: 'User cannot be created'})
    }
}

async function login(req, res) {
    try {
        console.log('user controllers login function username')
        let user = await User.findByUsername(req.body.username)
        if (!user) {
            console.log('error 1')
            throw new Error('No user with this username')
            
        }
        console.log('user controllers login function password')
        const passwordCheck = await bcrypt.compare(req.body.password, user.password)
        console.log(req.body.password)
        console.log(user.password)
        if (passwordCheck) {
            console.log('CORRECT PASSWORD')
            console.log(passwordCheck)
            res.status(200).json({ user: user.username})
        } else {
            console.log('error 2')
            throw new Error('User could not be authenticated')
        }
     } catch (err) {
         res.status(401).json({err: 'Username or Password incorrect!'})
     }
 }


async function destroy(req, res) {
    try {
        const user = await User.findByUsername(req.params.username)
        await user.destroy()
        res.status(204).end()
    } catch (err) {
        res.status(404).json({err});
    };
}

module.exports = { index, create, show, destroy, login }

