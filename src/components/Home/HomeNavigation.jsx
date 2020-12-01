import React from "react"
import { useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import "./home-navigation.scss"
import Burger from "../Burger"

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
  const { navigationLogo } = useStaticQuery(query)

  return (
    <div className="home-navigation">
      <Image fixed={navigationLogo.childImageSharp.fixed} />
      <Burger classNameLinks={'navigation-links-home'} ></Burger>
    </div>
  )
}

export default HomeNavigation