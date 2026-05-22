import React, { useContext, useState } from 'react'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { useNavigate } from 'react-router-dom';
import TaskCategoryUi from './TaskCategoryUi';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import usePatch from '../../Hooks/usePatch';
import { ThemeContext } from '../../App';
import useDelete from '../../Hooks/useDelete';

const ChildViewTask = ({ tasks, taskId }) => {
    const { token } = useContext(ThemeContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const [task, settask] = useState(tasks ? tasks : {})
    const [canUpdate, setcanUpdate] = useState(false)
    const [canDlt, setcanDlt] = useState(true)
    const Navigate = useNavigate()
    const { patchdata, error } = usePatch(`${URL}/updatetask/${taskId}`, token) //update custom hook
    const { deleteData, dlterror } = useDelete(`${URL}/deletetask/${taskId}`, token)
    if (error) return alert(error)
    if (dlterror) return alert(dlterror)

    const handlePicker = (name, value) => {
        settask(prev => ({ ...prev, [name]: value }))
        setcanUpdate(true)
    }
    const handleChanges = (e) => {
        const { name, value } = e.target
        settask(prev => ({ ...prev, [name]: value }))
        setcanUpdate(true)
    }
    // update task
    const updateTask = (e) => {
        e.preventDefault()
        if (!canUpdate) return;
        const isempty = Object.values(task).some(val => val === undefined || val === null || val === '')
        if (isempty) return alert('Filed cannot be empty')
        setcanUpdate(false)
        patchdata(task)
        Navigate(-1)
    }
    // dlt task
    const deletetask = () => {
        if (!canDlt) return;
        setcanDlt(false)
        deleteData()
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    return (
        <div className='child-view-task'>
            <div className='viewtask-header'>
                <button id='back-btn' onClick={() => Navigate(-1)}><KeyboardBackspaceRoundedIcon /></button>
            </div>
            <div className='task-content'>
                <form onSubmit={updateTask}>
                    <div id='task-t-status'>
                        <input type="text" name="title" id="title" value={task?.title} onChange={handleChanges} />
                        <select id='slt-box' name='status' onChange={handleChanges}>
                            <option value="">Select</option>
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="blocked">Blocked</option>
                            <option value="cancellled">Cancelled</option>
                        </select>
                    </div>
                    <input type="text" name="description" id="des" value={task?.description} onChange={handleChanges} />
                    <TaskCategoryUi task={task} settask={settask} setcanUpdate={setcanUpdate} />
                    <select name='repeat' onChange={handleChanges} style={{ width: '100%', marginTop: '10px' }}>
                        <option value="">None</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                    <div className='s-e-time'>
                        <div className='time-pick'>
                            <label>Start time</label>
                            <TimePicker value={task?.starttime ? dayjs(task.starttime, "HH:mm:ss") : null} name="starttime" onChange={(time, timestring) => handlePicker('starttime', timestring)} size="large" style={{ width: '180px', height: '40px' }} />
                        </div>
                        <div className='time-pick'>
                            <label>End time</label>
                            <TimePicker value={task?.endtime ? dayjs(task.endtime, "HH:mm:ss") : null} name='endtime' onChange={(time, timestring) => handlePicker('endtime', timestring)} size="large" style={{ width: '180px', height: '40px' }} />
                        </div>
                    </div>
                    <div className='time-pick'>
                        <label>Due date:- {task?.dueDate}</label>
                        <DatePicker name='duedate' onChange={(time, timestring) => handlePicker('dueDate', timestring)} style={{ height: '40px' }} />
                    </div>
                    <div className='task-btns'>
                        <button id='dlt-btn' onClick={() => deletetask()} style={{ cursor: canDlt ? 'pointer' : 'not-allowed' }}>Delete</button>
                        <button id='updt-btn' type='submit' style={{ cursor: canUpdate ? 'pointer' : 'not-allowed' }}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChildViewTask
