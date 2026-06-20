const express = require('express')
const router = express.Router()
const User = require('../Models/UserModel')
const JWT = require('jsonwebtoken')
const sendEmail = require('../Middlewares/Nodemailer')
const dotenv = require('dotenv').config()

router.post('/password-reset-link', async (req, res) => {

    const { email } = req.body

    try {

        const user = await User.findOne({ email: email })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const token = JWT.sign({ id: user?._id, type: 'password-reset' }, process.env.PASSWORD_RESET_JWT_SECRET_KEY, { expiresIn: '10m' })
        const url = `http://localhost:3000/auth/password-reset/${token}`
        const subject = 'Use This Link to Reset Your Password'
        const sendLink = await sendEmail(user, url, subject)
        if (sendLink.status) {
            return res.status(200).json({ message: 'Password reset link sent successfully.' })
        } else if (!sendLink.status) {
            return res.status(500).json({ message: 'Failed to send password reset email.' })
        }

    } catch (error) {
        return res.status(500).json({ message: 'internal server error' })
    }

})
module.exports = router