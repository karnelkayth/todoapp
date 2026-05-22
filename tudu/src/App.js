import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from './AppRoutes';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const ThemeContext = createContext()

function App() {

  const [role, setrole] = useState()
  const [user, setuser] = useState()
  const [loading, setloading] = useState(true)
  const token = window.sessionStorage.getItem('tuduApp')
  const URL = process.env.REACT_APP_SERVER_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/getdata`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setuser(res?.data?.user)
        setrole(res?.data?.user?.Role)
        setloading(false)
      } catch (error) {
        const status = error?.response?.status
        if (status === 400 || status === 404 || status === 500 || status === 401) {
          alert(error?.response?.data?.message)
        }
      }
    }
    if (token && URL) {
      fetchData()
    }
  }, [token, URL])

  // if (loading) return <h1>Loading...</h1>

  return (
    <div className="App">
      <ThemeContext.Provider value={{ token, user, role }}>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
