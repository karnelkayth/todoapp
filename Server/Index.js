const { json } = require('body-parser')
const express = require('express')
const cors = require('cors')
const http = require('http')
const bodyparser = require('body-parser')

const app = express()
app.use(json())
app.use(express.json({ limit: '100mb' }))
app.use(bodyparser.json())
app.use(cors({
    origin: 'http://localhost:3000'
}
))
const server = http.createServer(app)

// db s
const dbconnect = require('./DBConnection')
// routers
const SignUp = require('./Router/SignUp')
const SignIn = require('./Router/SignIn')

const GetData = require('./Router/GetData')
const CreateTask = require('./Router/CreateTask')
const TodayTask = require('./Router/GetTodayTask')
const AllTasks = require('./Router/GetAllTasks')
const UpdateProfile = require('./Router/UpdateProfile')
const UpdateProfilePic = require('./Router/UpdateProfilePic')
const TaskDetail = require('./Router/TaskDetail')
const UpdateTask = require('./Router/UpdateTask')
const DeleteTask = require('./Router/DeleteTask')
const DWMTask = require('./Router/GetDWMtasks')
const DeleteAccount = require('./Router/DeleteAccount')
const UpdatePassword = require('./Router/UpdatePassword')
const Support = require('./Router/ContactSupport')
const ContactSupportMessage = require('./Router/ContactSupportMessage')

const UpdateEmail = require('./Router/UpdateEmail')
const VerifyOtp = require('./Router/UpdateEmail')

// call router
app.post('/signup', SignUp)
app.get('/getdata', GetData)
app.post('/signin', SignIn)
app.post('/createtask', CreateTask)
app.get('/todaytask', TodayTask)
app.get('/alltasks/:date', AllTasks)
app.patch('/updateprofile', UpdateProfile)
app.patch('/updateprofilepic', UpdateProfilePic)
app.get('/taskdetail/:taskId', TaskDetail)
app.patch('/updatetask/:taskId', UpdateTask)
app.delete('/deletetask/:taskId', DeleteTask)
app.get('/getdwmtask/:repeatType', DWMTask)
app.delete('/deleteAccount/:_id', DeleteAccount)
app.post('/requestotp', UpdateEmail)
app.patch('/requestEmailupdate', VerifyOtp)
app.patch('/updatepassword', UpdatePassword)
app.post('/support/message', Support)
app.get('/contactsupportmessaege', ContactSupportMessage)

server.listen(8000, () => {
    console.log('server is started')
})