import React, { useState } from 'react'
import axios from 'axios'

const useDelete = (URL, token) => {
    const [dlterror, setdlterr] = useState()

    const deleteData = async () => {
        try {

            const res = await axios.delete(URL, {
                headers: { Authorization: `Bearer ${token}` }
            })

        } catch (error) {
            const status = error?.response?.status
            if (status === 400 || status === 500 || status === 404) {
                setdlterr(error?.response?.data?.message || 'Something went wrong')
            }
        }
    }
    return { deleteData, dlterror}

}

export default useDelete
