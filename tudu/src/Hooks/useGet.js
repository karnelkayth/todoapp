import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useGet = (URL, token) => {
    const [data, setdata] = useState()
    const [error, seterror] = useState()
    const [loading, setloading] = useState(true)

    useEffect(() => {

        const fetchdata = async () => {
            try {
                const res = await axios.get(URL, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setdata(res?.data)
                setloading(false)
            } catch (error) {
                const status = error?.response?.status
                if (status === 404 || status === 500) {
                    seterror(error?.response?.data?.message)
                }
            }
        }

        if (URL && token) {
            fetchdata()
        }

    }, [URL, token])
    return { data, error, loading }
}

export default useGet
