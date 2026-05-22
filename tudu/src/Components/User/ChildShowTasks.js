import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App'
import useGet from '../../Hooks/useGet'
import ShowTasks from './ShowTasks'
import Calendar from './Calendar'

const ChildShowTasks = () => {

    const [date, setsltDate] = useState()
    const { user, token } = useContext(ThemeContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, loading, error } = useGet(`${URL}/alltasks/${date}`, token)

    if (loading) return <p>Loading...</p>
    if (error) return alert(error)

    return (
        <div className='all-task-page'>
            <div className='childall-task-page'>

                {/* header */}
                <div className='childalltask-header'>
                    <h3>All Tasks</h3>
                    {/* <button id='clear-btn'>Clear</button> */}
                    <Calendar setsltDate={setsltDate}/>
                </div>

                <div className='show-all-tasks-sec'>
                    <ShowTasks tasks={data} />
                </div>

            </div>
        </div>
    )
}

export default ChildShowTasks
