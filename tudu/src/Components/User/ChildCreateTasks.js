import React, { useContext, useState } from 'react'
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import axios from 'axios'
import { ThemeContext } from '../../App'
import TaskCategoryUi from './TaskCategoryUi';

const ChildCreateTasks = () => {
    const { role, user, token } = useContext(ThemeContext)
    const [callOnce, setcallOnce] = useState(true)
    const URL = process.env.REACT_APP_SERVER_URL
    const [task, settask] = useState({
        title: '',
        des: '',
        category: '',
        repeat: '',
        starttime: '',
        endtime: '',
        duedate: ''
    })

    // handle changes
    const handlechanges = (e) => {
        const { name, value } = e.target
        settask(data => ({ ...data, [name]: value }))
    }

    const handlePicker = (name, value) => {
        settask(data => ({ ...data, [name]: value }))
    }

    // add new task
    const addnewTask = async (e) => {
        e.preventDefault()
        if (!callOnce) return;
        const taskcopy = { ...task }
        if (taskcopy?.repeat === '') {
            delete taskcopy.repeat
        }
        const isempty = Object.values(taskcopy).some(val => val === '' || val === undefined || val === null)
        if (isempty) return alert('Fill up all informations')
        try {
            setcallOnce(false)
            const res = await axios.post(`${URL}/createtask`, { taskcopy }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            setcallOnce(true)
            const status = err?.response?.status
            if (status === 400 || status === 404 || status === 500) {
                return alert(err?.response?.data?.message)
            }
        }
    }

    return (
        <div className='child-create-task'>
            <div className='childcreate-task-page'>

                <div className='c-new-task'>
                    <h3>Create your new task</h3>
                    <div className='inputs'>
                        <form onSubmit={addnewTask}>
                            <input type="text" name="title" id="task-input" placeholder='Title' onChange={handlechanges} />
                            <textarea name='des' onChange={handlechanges} rows="2" placeholder='Description'></textarea>
                            <TaskCategoryUi task={task} settask={settask} />
                            <select name='repeat' onChange={handlechanges} style={{ width: '100%', marginTop: '10px' }}>
                                <option value="">None</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                            <div className='timepick-sec'>
                                <div className='time-pick'>
                                    <label>Start time</label>
                                    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} name="starttime" onChange={(time, timestring) => handlePicker('starttime', timestring)} size="large" style={{ width: '180px', height: '30px' }} />
                                </div>
                                <div className='time-pick'>
                                    <label>Start time</label>
                                    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} format="HH:mm:ss" name='endtime' onChange={(time, timestring) => handlePicker('endtime', timestring)} size="large" style={{ width: '180px', height: '30px' }} />
                                </div>
                            </div>
                            <div className='time-pick'>
                                <label>Due date</label>
                                <DatePicker name='duedate' onChange={(time, timestring) => handlePicker('duedate', timestring)} style={{ height: '30px' }} />
                            </div>
                            <button type='submit' style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}>Add new task</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChildCreateTasks
