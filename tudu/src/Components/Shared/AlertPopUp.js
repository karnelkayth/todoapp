import React from 'react'
import '../../Styles/AccountSuspend.css'

const AlertPopUp = ({ error }) => {
    return (
        <div className='alert-popup'>
            {error && <p className='alert-message'>{error}</p>}
        </div>
    )
}

export default AlertPopUp
