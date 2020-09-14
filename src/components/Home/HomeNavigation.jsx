import React from "react"
import { useStaticQuery, Link } from "gatsby"
import Image from "gatsby-image"
import "./home-navigation.scss"
import NavigationLinks from "../NavigationLinks"
import { useState } from "react"
import HamburgerMenu from "react-hamburger-menu"
import { slide as Menu } from "react-burger-menu"

export const query = graphql`
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

const HomeNavigation = ({ classNameLinks }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { navigationLogo } = useStaticQuery(query)

  return (
    <div className="home-navigation">
      <Image fixed={navigationLogo.childImageSharp.fixed} />
      {/* <Menu right={true} isOpen={false} burgerButtonClassName="bm-burger-button"
        crossButtonClassName="bm-icon">
        <a id="home" href="/">Home</a>
        <a id="about" href="/despre">Despre noi</a>
        <a id="contact" href="/contact">Contact</a>
        <a href="">Settings</a>
      </Menu> */}
      {/* <HamburgerMenu className={'navigation-hamburger-home'}
        isOpen={isOpen}
        menuClicked={() => setIsOpen(!isOpen)}
        color="white"
        className="border" /> */}
      <NavigationLinks classNameLinks={'navigation-links-home'} />
    </div>
  )
}

export default HomeNavigation