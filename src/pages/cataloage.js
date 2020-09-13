import React from 'react'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import Layout from '../components/Layout'
import CataloageContent from '../components/Cataloage/CataloageContent'

export default props=>{
    return (
        <Layout>
        <Header image={props.data.cataloageHeader.childImageSharp.fluid} className="header-cataloage">
            <div className="header-cataloage_content">
            <Navigation className="navigation-cataloage"/>
            <div className="header-filter" id="header-filter"></div>
            <p>COLECȚIILE PORCELANOSA</p>
            </div>
        </Header>

        <CataloageContent />
        </Layout> 
    )
}

export const query=graphql`
{
    cataloageHeader:file(relativePath:{eq:"cataloage-header.png"}){
        childImageSharp{
          fluid(maxWidth:1600){
            ...GatsbyImageSharpFluid
          }
        }
      }
            
}
`