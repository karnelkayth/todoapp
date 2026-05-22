import React from 'react'
import useGet from '../../Hooks/useGet'
import { ThemeContext } from '../../App'
import { useState, useContext } from 'react'
import ShowTasks from './ShowTasks'
import '../../Styles/ShowTasks.css'

const TodayTasks = () => {
    const { user, token } = useContext(ThemeContext)
    const [callTA, setcallTA] = useState(true)
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, error, loading } = useGet(`${URL}/todaytask`, token)

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    
    return (
        <div className='todaytasks'>
            {/* header */}
            <div className='childalltask-header'>
                <h3>Today's Tasks</h3>
            </div>
            <ShowTasks tasks={data} callTA={callTA}/>
        </div>
    )
}

export default TodayTasks
