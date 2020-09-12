import React from "react"
import { useStaticQuery, Link } from "gatsby"
import Image from "gatsby-image"
import "./home-navigation.scss"
import NavigationLinks from "../NavigationLinks"
import { useState } from "react"
import HamburgerMenu from "react-hamburger-menu"

export const query=graphql`
{
  navigationLogo:file(relativePath:{eq:"logo.png"})
    {
      childImageSharp{
        fixed(width:120){
          ...GatsbyImageSharpFixed
        }
      }
    }
}

`

const HomeNavigation=({classNameLinks})=>{
  const [isOpen,setIsOpen]=useState(false)
    const {navigationLogo}=useStaticQuery(query)
    return(
        <div className="home-navigation">
            <Image fixed={navigationLogo.childImageSharp.fixed} />
        <HamburgerMenu className={'navigation-hamburger-home'} 
                       isOpen={isOpen} 
                       menuClicked={()=>setIsOpen(prevState=>!prevState)} 
                       color="white"/>
        <NavigationLinks classNameLinks={'navigation-links-home'} />
        </div>
    )
}

export default HomeNavigation