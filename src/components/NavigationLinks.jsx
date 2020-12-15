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
                    <Link to="/" activeStyle={{ fontWeight: "900", fontSize: "30px" }}>
                        ACASĂ
                    </Link>
                </li>
                <li onClick={() => setIsProductsMenu(prevState => !prevState)} >
                    <a className={isProductsMenu ? 'navigation-links-active' : ''}>
                        PRODUSE
                    </a>
                </li>
                <li>
                    <Link to="/cataloage" activeStyle={{ fontWeight: "900", fontSize: "30px" }}>
                        CATALOAGE
                    </Link>
                </li>
                <li>
                    <Link to="/despre" activeStyle={{ fontWeight: "900", fontSize: "30px" }}>
                        DESPRE
                    </Link>
                </li>
                <li>
                    <Link to="/contact" activeStyle={{ fontWeight: "900", fontSize: "30px" }}>
                        CONTACT
                    </Link>
                </li>
            </ul>

            {isProductsMenu ? <ProductsMenu className={className} isHome={classNameLinks.includes('home')} /> : null}
        </>
    )
}

export default NavigationLinks