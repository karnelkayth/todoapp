import React from 'react'
import UserHeader from './UserHeader'
import Calendar from './Calendar'
import '../../Styles/Setting.css'
import { Link } from 'react-router-dom'

const Setting = () => {
    return (
        <div className='userpanel'>
            <div className='child-panel'>

                <div className='panel-left-side'>
                    <UserHeader />
                </div>
                <div className='panel-right-side'>
                    <h3 id='title'>Settings & Support</h3>
                    <div className='setting-panel'>

                        <div className='setting-popup'>
                            <span>Account</span>
                            <div className='setting-child-popup'>
                                <p>Personal information</p>
                                <Link to={'/setting/email'} id='link'><p>Email address</p></Link>
                                <Link to={'/setting/phone'} id='link'><p>Phone</p></Link>
                                <Link to={'/setting/password'} id='link'><p>Password</p></Link>
                            </div>
                        </div>
                        <div className='setting-popup'>
                            <span>Account management</span>
                            <div className='setting-child-popup'>
                                <Link to={'/setting/deleteAccount'} id='link'><p>Delete account</p></Link>
                            </div>
                        </div>
                        <div className='setting-popup'>
                            <span>Support</span>
                            <div className='setting-child-popup'>
                                <Link to={'/setting/contactSupport'} id='link'><p>Contact support</p></Link>
                            </div>
                        </div>
                        <button id='signout-btn'>Signout</button>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Setting
