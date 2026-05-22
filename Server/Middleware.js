const express = require('express')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const UserModle = require('./Models/UserModel')

const Middleware = async (req, res, next) => {
    try {

        const header = req.headers.authorization
        const token = header.split(' ')[1]

        if (!token) {
            req.jwterror = {
                status: 401,
                message: "Invalid token"
            };
            return next();
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET_KEY)

        if (decode.role === 'User') {
            const user = await UserModle.findById({ _id: decode?.id })
            if (!user) return res.status(404).json({ message: 'User not found' })
            req.user = decode
            next()
        }

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

module.exports = Middleware