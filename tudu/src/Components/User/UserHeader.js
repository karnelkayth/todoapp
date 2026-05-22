import React, { useContext } from 'react'
import '../../Styles/UserHeader.css'
import logo from '../../Images/logo.png'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const UserHeader = () => {

    const {role, user, token } = useContext(ThemeContext) 

    // signout
    const signout = () => {
        window.sessionStorage.clear()
        window.location.reload()
    }

    return (
        <div className='user-header'>

            <img src={logo} alt="" id='logo'/>

            <div className='nav-links'>
                {/* <div>
                    <Link to={'/home'} id='links'><p><HomeRoundedIcon style={{color:'white'}}/></p></Link>
                </div> */}
                <div>
                    <Link to={'/home'} id='links'><p><HomeRoundedIcon style={{color:'black'}}/></p></Link>
                </div>
                <div>
                    <Link to={'/alltasks'} id='links'><p><WidgetsRoundedIcon style={{color:'black'}}/></p></Link>
                </div>
                <div>
                    <Link to={'/daily/weekly/monthly'} id='links'><p><CalendarMonthRoundedIcon style={{color:'black'}}/></p></Link>
                </div>
                <div>
                    <Link to={'/createtask'} id='links'><p><AddRoundedIcon style={{color:'black'}}/></p></Link>
                </div>
                <div>
                    <Link to={'/setting'} id='links'><p><SettingsRoundedIcon style={{color:'black'}}/></p></Link>
                </div>
            </div>

            <div className='btns'>
                {
                    !user?<button>SignUp</button>:
                <button onClick={signout}>SignOut</button>
                }
            </div>

        </div>
    )
}

export default UserHeader
