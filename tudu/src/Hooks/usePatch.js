import React, { useState } from 'react'
import axios from 'axios'

const usePatch = (URL, token, setcallOnce) => {

    const [loading, setloading] = useState()
    const [error, seterror] = useState()

    const patchdata = async (updateData) => {
        try {
            const res = await axios.patch(URL, { updateData }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (err) {
            const status = err?.response?.status
            if (status === 500 || status === 401 || status === 404) {
                seterror(err?.response?.data?.message || 'something went wrong')
            }
            setcallOnce(true)
        }
    }
    setTimeout(() => {
        seterror('')
    }, 2000);

    return { patchdata, loading, error }
}

export default usePatch
