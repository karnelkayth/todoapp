const mongoose = require('mongoose')
require('dotenv').config()

const dbconnect = async () => {
    const connect = await mongoose.connect('mongodb://localhost:27017/tudu')
    if(connect) return console.log('DB connected')
        return console.log('DB not connected')
}
dbconnect()
module.exports = dbconnect