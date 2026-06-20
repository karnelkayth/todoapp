import React, { useContext } from 'react'
import useGet from '../../Hooks/useGet'
import useToken from 'antd/es/theme/useToken'
import { ThemeContext } from '../../App'
import AlertPopUp from './AlertPopUp'

const AllAnnouncements = () => {

    const URL = process.env.REACT_APP_SERVER_URL
    const { data, error, loading } = useGet(`${URL}/announcements`)
    if(error) return <AlertPopUp error={error}/>

    return (
        <div className='allannouncements'>
            {
                data?.announcements.length > 0 ? data?.announcements.map((announcement, index) => {
                    return (
                        <div className='announcement-sec'>
                            <h3>{announcement?.title}</h3>
                            <p>{announcement?.message}</p>
                        </div>
                    )
                }) : ''
}
        </div>
    )
}

export default AllAnnouncements
