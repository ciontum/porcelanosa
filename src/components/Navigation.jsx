import React from 'react'
import LogoPNG from "../images/logo.png"
import "./navigation.scss"
import { Link } from 'gatsby'
import NavigationLinks from './NavigationLinks'

const Navigation=({className})=>{

    return (
        <div className='navigation-container'>
        <div className={`navigation ${className ? className : ''}`}>
            <img src={LogoPNG} alt='logo' />
        
            <NavigationLinks className="main-navigation"/>
        </div>
        </div>
    )
}

export default Navigation