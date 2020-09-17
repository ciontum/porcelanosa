import React from "react"
import BackGroundImage from 'gatsby-background-image'
import "./header.scss"

const Header = ({ image, children, className, isFirstPage }) => {
    return (
        <BackGroundImage fluid={image} className={`header-image ${className ? className : ''}`} >
            {children}
        </BackGroundImage>
    )
}

export default Header