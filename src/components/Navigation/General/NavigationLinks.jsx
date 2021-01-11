import React, { useContext, useRef, useEffect } from "react"
import "./navigation-links.scss"
import { Link } from "gatsby"
import ProductsMenu from "./ProductsMenu"
import { IsMenuOpenedContext } from "../../../utils/context"

const NavigationLinks = ({ className, classNameLinks }) => {
    const { isProductsMenuOpen, setProductsMenuOpen } = useContext(IsMenuOpenedContext)

    const modalRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (isProductsMenuOpen) {
                if (!modalRef.current.contains(event.target)) {
                    setProductsMenuOpen(false)
                }
            } else {
                if (buttonRef.current && buttonRef.current.contains(event.target)) {
                    setProductsMenuOpen(!isProductsMenuOpen)
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, buttonRef, isProductsMenuOpen]);

    return (
        <>
            <ul className={`navigation-links ${classNameLinks ? classNameLinks : ''}`}>
                <li>
                    <Link to="/" activeClassName="active" onClick={() => window.scrollTo(0, 0)}>
                        ACASĂ
                    </Link>
                </li>
                <li ref={buttonRef} >
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
                    <Link to="/portofoliu" activeClassName="active" onClick={() => window.scrollTo(0, 0)}>
                        PORTOFOLIU
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

            {isProductsMenuOpen ? <ProductsMenu reference={modalRef} className={className} isHome={classNameLinks.includes('home')} /> : null}
        </>
    )
}

export default NavigationLinks