import React from 'react'
import LogoPNG from "../images/logo.png"
import "./navigation.scss"
import NavigationBurger from "./NavigationBurger"
import { Link } from "gatsby"

const Navigation = ({ className }) => {
    return (
        <div className='navigation-container'>
            <div className={`navigation ${className ? className : ''}`}>
                <Link to="/">
                    <img src={LogoPNG} alt='logo' />
                </Link>
                <NavigationBurger classNameLinks="main-navigation-mini" />
            </div>
        </div>
    )
}

export default Navigation