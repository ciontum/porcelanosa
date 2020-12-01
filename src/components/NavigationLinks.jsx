import React, { useState } from "react"
import "./navigation-links.scss"
import { Link } from "gatsby"
import ProductsMenu from "./ProductsMenu"

const NavigationLinks = ({ className, classNameLinks }) => {

    const [isProductsMenu, setIsProductsMenu] = useState(false)
    return (
        <>
            <ul className={`navigation-links ${classNameLinks ? classNameLinks : ''}`}>
                <li>
                    <Link to="/" activeStyle={{ borderBottom: '1px solid white' }}>
                        ACASĂ
                    </Link>
                </li>
                <li onClick={() => setIsProductsMenu(prevState => !prevState)} >
                    <a className={isProductsMenu ? 'navigation-links-active' : ''}>
                        PRODUSE
                    </a>
                </li>
                <li>
                    <Link to="/cataloage" activeStyle={{ borderBottom: '1px solid #ffffffa1' }}>
                        CATALOAGE
                    </Link>
                </li>
                <li>
                    <Link to="/despre" activeStyle={{ borderBottom: '1px solid #ffffffa1' }}>
                        DESPRE
                    </Link>
                </li>
                <li>
                    <Link to="/contact" activeStyle={{ borderBottom: '1px solid #ffffffa1' }}>
                        CONTACT
                    </Link>
                </li>
            </ul>

            {isProductsMenu ? <div style={{ width: "100%", margin: "0 auto", position: "absolute", left: "0px" }}><ProductsMenu className={className} /> </div> : null}
        </>
    )
}

export default NavigationLinks