import React, { useState } from 'react'
import '../../Styles/Auth.css'
import logo from '../../Images/logo.png'
import { Link } from 'react-router-dom';
import axios from 'axios'

const SignUp = () => {
  const URL = process.env.REACT_APP_SERVER_URL
  const [authData, setauthData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [callOnce, setcallOnce] = useState(true)

  const handlechanges = (e) => {
    const { name, value } = e.target
    setauthData(data => ({ ...data, [name]: value }))
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!callOnce) return;
    const isempty = Object.values(authData).some(val => val === '' || val === undefined || val === null)
    if (isempty) return alert('Fill up all informations')
    try {
      setcallOnce(false)
      const res = await axios.post(`${URL}/signup`, { authData })
      window.sessionStorage.setItem('tuduApp', res?.data?.token)
      window.location.reload()
    } catch (err) {
      setcallOnce(true)
      const status = err?.response?.status
      if(status === 400 || status === 409 || status === 500){
        alert(err?.response?.data?.message)
      }
    }
  }

  return (
    <div className='auth-page'>
      <div className='child-auth-page'>

        <div className='wrapper-content'>
          <img src={logo} alt="" id='auth-logo' />

          <p id='auth-title'>SignUp</p>
          <p style={{ fontSize: '14px' }}>Enter email and password to SignUp</p>

          <form onSubmit={handleSignup}>
            <div className='data'>
              <input type="text" name="name" id="" onChange={handlechanges} placeholder='Your name'/>
              <input type="email" name="email" id="" onChange={handlechanges} placeholder='Enter email' />
              <input type="password" name="password" id="" onChange={handlechanges} placeholder='Create password' />
            </div>

            <button id='signup-btn' type='submit'>SignUp</button>
          </form>
          <p id='alr-acc'>Already have an account? <Link to={'/signin'}><strong style={{ color: '#6C66EC', cursor: 'pointer' }}>SignIn</strong></Link></p>
        </div>

      </div>
    </div>
  )
}

export default SignUp
