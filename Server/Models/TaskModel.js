const mongoose = require('mongoose')

// schema 
const Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    taskId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Work','Personal','Shopping','Study','Health','Home','Finance','Travel','Others']
    },
    repeat: {
        type: String,
    },
    starttime: {
        type: String,
        required: true
    },
    endtime: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString()
    }
})

// model
const Model = mongoose.model('tasks', Schema)
module.exports = Model