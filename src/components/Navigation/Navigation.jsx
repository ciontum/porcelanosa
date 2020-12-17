import React, { useState } from 'react'
import LogoPNG from "../../images/logo.png"
import "./navigation.scss"
import NavigationBurger from "./General/NavigationBurger"
import { Link } from "gatsby"
import { IsMenuOpenedContext } from "../../utils/context"

const Navigation = ({ className }) => {
    const [isProductsMenuOpen, setProductsMenuOpen] = useState(false)

    return (
        <IsMenuOpenedContext.Provider value={{ isProductsMenuOpen, setProductsMenuOpen }}>
            <div className='navigation-container'>
                <div className={`navigation ${className ? className : ''}`}>
                    <Link to="/">
                        <img src={LogoPNG} alt='logo' />
                    </Link>
                    <NavigationBurger classNameLinks="main-navigation-mini" />
                </div>
            </div>
        </IsMenuOpenedContext.Provider>
    )
}

export default Navigation