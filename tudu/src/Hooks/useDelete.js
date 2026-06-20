import React, { useState } from 'react'
import axios from 'axios'

const useDelete = (URL, token, setcanDlt) => {
    const [dlterror, setdlterr] = useState()

    const deleteData = async () => {
        try {

            const res = await axios.delete(URL, {
                withCredentials: true
             })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (error) {
            const status = error?.response?.status
            if (status === 400 || status === 500 || status === 404) {
                setdlterr(error?.response?.data?.message || 'Something went wrong')
            }
            setcanDlt(true)
        }
    }
    return { deleteData, dlterror }

}

export default useDelete
