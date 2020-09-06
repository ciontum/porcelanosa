import React from "react"
import { useStaticQuery, Link } from "gatsby"
import Image from "gatsby-image"
import "./home-navigation.scss"
import NavigationLinks from "../NavigationLinks"

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
    const {navigationLogo}=useStaticQuery(query)
    return(
        <div className="home-navigation">
            <Image fixed={navigationLogo.childImageSharp.fixed} />
        <NavigationLinks classNameLinks={'navigation-links-home'} />
        </div>
    )
}

export default HomeNavigation