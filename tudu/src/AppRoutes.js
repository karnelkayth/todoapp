import React, { useContext, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeContext } from './App';

// user
import UserPanel from './Components/User/UserHome';
import AllTasks from './Components/User/AllTasks';
import CreateTask from './Components/User/CreateTask';
import Setting from './Components/User/Setting';
import UserProfile from './Components/User/UserEditProfile';
import ViewTask from './Components/User/ViewTask';
import DWMTask from './Components/User/DWMTask';
import EmailUpdate from './Components/User/EmailUpdate';
import UpdatePhone from './Components/User/UpdatePhone';
import Password from './Components/User/Password';
import DeleteAccount from './Components/User/DeleteAccount';
import ContactSupport from './Components/User/ContactSupport';

// auth
import SignUp from './Components/Auth/SignUp';
import SignIn from './Components/Auth/SignIn';

// admin

const AppRoutes = () => {
    const { role, token, user } = useContext(ThemeContext)

    return (
        <>
            <Routes>
               
                {!role && <>
                    <Route path='*' element={<Navigate to="/signup" />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/signin' element={<SignIn />} />
                </>}

                {
                    user?.Role && role === 'User' && <>
                        <Route path='*' element={<Navigate to="/user" />} />
                        <Route path='/user' element={<UserPanel />} />
                        <Route path='/alltasks' element={<AllTasks />} />
                        <Route path='/createtask' element={<CreateTask />} />
                        <Route path='/setting' element={<Setting />} />
                        <Route path='/profile/edit/:_id' element={<UserProfile />} />
                        <Route path='/viewtask/:title/:taskId' element={<ViewTask />} />
                        <Route path='/daily/weekly/monthly' element={<DWMTask />} />
                        <Route path='/setting/email' element={<EmailUpdate />} />
                        <Route path='/setting/phone' element={<UpdatePhone />} />
                        <Route path='/setting/password' element={<Password />} />
                        <Route path='/setting/deleteAccount' element={<DeleteAccount />} />
                        <Route path='/setting/contactSupport' element={<ContactSupport />} />
                    </>
                }

                {/* {
                    user?.Role && role === 'Admin' && <>
                    
                    </>
                } */}
            </Routes>
        </>
    )
}

export default AppRoutes
