import React from "react"
import Layout from "../components/Layout"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import DespreCard from "../components/Despre/DespreCard"

export default props => {
  return (
    <Layout>
      <Header image={props.data.cataloageHeader.childImageSharp.fluid} className="header-cataloage header-despre">
        <div className="header-cataloage_content">
          <Navigation className="navigation-cataloage" />
          <div className="header-filter" id="header-filter"></div>
          <p>DESPRE NOI</p>
        </div>
      </Header>
      <DespreCard />
    </Layout>
  )
}

export const query = graphql`
{
    cataloageHeader:file(relativePath:{eq:"despre-header.png"}){
        childImageSharp{
          fluid(maxWidth:1600){
            ...GatsbyImageSharpFluid
          }
        }
      }

}
`