import React from "react"
import { useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import "./home-navigation.scss"
import Burger from "../Navigation/Home/Burger"
import { IsMenuOpenedContext } from "../../utils/context"
import { useState } from "react"

export const query = graphql`
{
  navigationLogo:file(relativePath:{eq:"logo2.png"}) {
    childImageSharp {
      fixed(width:120) {
          ...GatsbyImageSharpFixed
      }
    }
  }
}
`

const HomeNavigation = () => {
  const { navigationLogo } = useStaticQuery(query)
  const [isProductsMenuOpen, setProductsMenuOpen] = useState(false)

  return (
    <div className="home-navigation">
      <Image fixed={navigationLogo.childImageSharp.fixed} />
      <IsMenuOpenedContext.Provider value={{ isProductsMenuOpen, setProductsMenuOpen }}>
        <Burger classNameLinks={'navigation-links-home'} />
      </IsMenuOpenedContext.Provider>
    </div>
  )
}

export default HomeNavigation