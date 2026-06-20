import React from 'react'
import axios from 'axios'

const SignOutApi = async () => {
    const URL = process.env.REACT_APP_SERVER_URL
    try {

        const res = await axios.post(`${URL}/signout`, {}, {
            withCredentials: true
        })
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    } catch (error) {
        const status = error?.response?.status
        if (status === 500) {
            alert(error?.response?.data?.message)
        }
    }
}

export default SignOutApi
