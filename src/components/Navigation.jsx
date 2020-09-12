import React, { useState } from 'react'
import LogoPNG from "../images/logo.png"
import "./navigation.scss"
import { Link } from 'gatsby'
import NavigationLinks from './NavigationLinks'
import HamburgerMenu from 'react-hamburger-menu'

const Navigation=({className})=>{

    const [isOpen,setIsOpen]=useState(false)
    return (
        <div className='navigation-container'>
        <div className={`navigation ${className ? className : ''}`}>
            <img src={LogoPNG} alt='logo' />
            
            <HamburgerMenu className={'navigation-hamburger'} 
                       isOpen={isOpen} 
                       menuClicked={()=>setIsOpen(prevState=>!prevState)} 
                       color="white"/>
            <NavigationLinks className="main-navigation" classNameLinks="main-navigation-mini"/>
        </div>
        </div>
    )
}

export default Navigation