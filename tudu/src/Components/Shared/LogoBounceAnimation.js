import React, { useEffect, useState } from 'react'
import logo from '../../Images/logo.png'
import '../../Styles/LogoAnimation.css'

const LogoBounceAnimation = ({logobounce,setlogoBounce}) => {

    useEffect(() => {
        const logoAnimation = window.sessionStorage.getItem('logoAnimation')
        if (!logoAnimation) {
            setlogoBounce(true)
            window.sessionStorage.setItem('logoAnimation', true)
            setTimeout(() => {
                // setlogoBounce(false)
            }, (3000));
        }
    }, [])

    return (
        <>
            {
                logobounce && <div className='bounce'>
                    <div className='child-bounce'>
                        <img src={logo} alt="" />
                    </div>
                </div>
            }
        </>
    )
}

export default LogoBounceAnimation
