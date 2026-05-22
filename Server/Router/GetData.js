const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')

router.get('/getdata', Middleware, async (req, res) => {
    if (req.jwterror) return res.status(401).json({ message: req.jwterror.message })
    const { id, role } = req.user

    try {

        if (!id || !role) return res.status(400).json({ message: 'Require data is missing' })
        if (role === 'User') {
            const user = await UserModel.findById({ _id: id }).select('-password')
            if (!user) return res.status(404).json({ message: 'User not found' })
            return res.status(200).json({
                status: 200,
                user: user
            })
        } else if (role === 'Admin') {

        }

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' })
    }

})
module.exports = router