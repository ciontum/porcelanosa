import React, { useContext } from "react"
import "./navigation-links.scss"
import { Link } from "gatsby"
import ProductsMenu from "./ProductsMenu"
import { IsMenuOpenedContext } from "../../../utils/context"

const NavigationLinks = ({ className, classNameLinks }) => {
    const { isProductsMenuOpen, setProductsMenuOpen } = useContext(IsMenuOpenedContext)

    return (
        <>
            <ul className={`navigation-links ${classNameLinks ? classNameLinks : ''}`}>
                <li>
                    <Link to="/" activeClassName="active" onClick={() => window.scrollTo(0, 0)}>
                        ACASĂ
                    </Link>
                </li>
                <li onClick={() => setProductsMenuOpen(!isProductsMenuOpen)} >
                    <a className={isProductsMenuOpen ? 'navigation-links-active' : ''}>
                        PRODUSE
                    </a>
                </li>
                <li>
                    <Link to="/cataloage" activeClassName="active" onClick={() => window.scrollTo(0, 0)}>
                        CATALOAGE
                    </Link>
                </li>
                <li>
                    <Link to="/despre" activeClassName="active" onClick={() => window.scrollTo(0, 0)}>
                        DESPRE
                    </Link>
                </li>
                <li>
                    <Link to="/contact" activeClassName="active" onClick={() => window.scrollTo(0, 0)}>
                        CONTACT
                    </Link>
                </li>
            </ul>

            {isProductsMenuOpen ? <ProductsMenu className={className} isHome={classNameLinks.includes('home')} /> : null}
        </>
    )
}

export default NavigationLinks