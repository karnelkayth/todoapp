const express = require('express')
const router = express.Router()
const Middleware = require('../Middleware')
const UserModel = require('../Models/UserModel')
const TaskModel = require('../Models/TaskModel')

router.patch('/updatetask/:taskId', Middleware, async (req, res) => {

    const { id, role } = req.user
    const { taskId } = req.params
    const { updateData } = req.body

    try {

        const user = await UserModel.findById({ _id: id })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const task = await TaskModel.findOne({ taskId: taskId, userId: user?._id })
        if (!task) return res.status(404).json({ message: 'Task not found' })
        const updateTask = await TaskModel.findOneAndUpdate(
            { taskId: taskId, userId: user?._id },
            { $set: updateData }
        )
        if (!updateTask) return res.status(500).json({ message: 'Internal server error' })
        return res.status(200).json({ message: 'Successfully updated' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
        console.log(error)
    }

})
module.exports = router