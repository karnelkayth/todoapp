import React, { useContext, useState } from 'react'
import '../../Styles/ContactSupport.css'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { useNavigate } from 'react-router-dom';
import cs from '../../Images/cs.png'
import { ThemeContext } from '../../App'
import axios from 'axios'
import SupportMessage from '../Shared/SupportMessage';

const ContactSupport = () => {

    const Navigate = useNavigate()
    const { token } = useContext(ThemeContext)
    const [callOnce, setcallOnce] = useState(true)
    const [message, setmessage] = useState()
    const URL = process.env.REACT_APP_SERVER_URL

    const sendMessage = async (e) => {
        e.preventDefault()
        if (!callOnce) return;
        if (!message) return;
        try {
            setcallOnce(false)
            const res = await axios.post(`${URL}/support/message`, { message }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, (2000));
        } catch (error) {
            const status = error?.response?.status
            if (status === 404 || status === 500) {
                alert(error?.response?.data?.message)
            }
            setcallOnce(true)
        }
    }

    return (
        <div className='contact-support'>
            <div className='cs-go-back'>
                <button onClick={() => Navigate(-1)}><KeyboardArrowLeftRoundedIcon /></button>
                <p>Contact Support</p>
            </div>
            <div className='cs-page' style={{marginTop:'15px'}}>
                <div className='cs-top-content'>
                    <img src={cs} alt="" id='cs-img' />
                    <h3>We,re here to help</h3>
                    <p>Have a question, feedback or need help <br /> Send us a message we,ll get back to you soon </p>
                </div>
                {/* contact support msg */}
                <div className='contact-support-msg'>
                    <SupportMessage/>
                </div>
                <div className='cs-form'>
                    <form onSubmit={sendMessage}>
                        <label>Message</label>
                        <textarea cols="30" rows="2" placeholder='Message' onChange={(e) => setmessage(e.target.value)}></textarea>
                        <button type='submit' style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}>Send message</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactSupport
