const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')

router.patch('/updateprofilepic', Middleware, async (req, res) => {
    const {id, role} = req.user
    const {updateData} = req.body
    console.log(id, role, updateData)
})
module.exports = router
