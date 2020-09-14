import React, { useState } from 'react'
import LogoPNG from "../images/logo.png"
import "./navigation.scss"
import NavigationBurger from "./NavigationBurger"

const Navigation = ({ className }) => {

    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='navigation-container'>
            <div className={`navigation ${className ? className : ''}`}>
            <img src={LogoPNG} alt='logo' />
                <NavigationBurger classNameLinks="main-navigation-mini" />
            </div>
        </div>
    )
}

export default Navigation