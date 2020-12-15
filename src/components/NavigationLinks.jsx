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
                    <Link to="/" activeClassName="active">
                        ACASĂ
                    </Link>
                </li>
                <li onClick={() => setIsProductsMenu(prevState => !prevState)} >
                    <a className={isProductsMenu ? 'navigation-links-active' : ''}>
                        PRODUSE
                    </a>
                </li>
                <li>
                    <Link to="/cataloage" activeClassName="active">
                        CATALOAGE
                    </Link>
                </li>
                <li>
                    <Link to="/despre" activeClassName="active">
                        DESPRE
                    </Link>
                </li>
                <li>
                    <Link to="/contact" activeClassName="active">
                        CONTACT
                    </Link>
                </li>
            </ul>

            {isProductsMenu ? <ProductsMenu className={className} isHome={classNameLinks.includes('home')} /> : null}
        </>
    )
}

export default NavigationLinks