import React, { useContext } from 'react'
import '../../Styles/ContactSupport.css'
import useGet from '../../Hooks/useGet'
import { ThemeContext } from '../../App'

const SupportMessage = () => {

    const { token } = useContext(ThemeContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, loading, error } = useGet(`${URL}/contactsupportmessaege`, token)
    if (loading) return <h1>Loading...</h1>
    if (error) alert(error)

    return (
        <div className='message-row'>
            {data?.messages.length === 0 ? <p>No Support Messages Yet</p> : data?.messages.map((message, index) => {
                return (
                    <div className='msg-popup' id={`${message?.role}`}>
                        <p>{message?.message}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default SupportMessage
