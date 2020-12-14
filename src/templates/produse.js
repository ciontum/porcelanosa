import React, { useState } from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/Layout'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import Image from "gatsby-image"
import "./styles.scss"
import BackgroundImage from 'gatsby-background-image'

export default data => {
  const formatImagesArr = (imagesArr) => {
    let result = []
    for (let i = 0; i < imagesArr.length; i++) {
      if (i % 6 === 0) {
        result.push([imagesArr[i]])
      } else {
        result[result.length - 1].push(imagesArr[i])
      }
    }

    return result
  }

  const formatCataloageArr = (cataloageArr) => {
    const pdfs = cataloageArr.filter(catalog => catalog.node.extension === 'pdf')
    const images = cataloageArr.filter(catalog => catalog.node.extension === 'png')

    const cataloage = pdfs.map(pdf => {
      const myImage = images.filter(image => image.node.name === pdf.node.name)[0]

      return {
        image: myImage ? myImage.node : { childImageSharp: { fixed: null } },
        pdf: myImage ? pdf.node.publicURL : null,
        primary: myImage ? pdf.node.name : null
      }
    })

    return cataloage
  }

  const [state] = useState(() => {
    const cataloage = formatCataloageArr(data.data.cataloage.edges)
    const images = formatImagesArr(data.data.images.edges)

    return {
      cataloage,
      images
    }
  })

  return <Layout>
    <Header image={data.data.hero.edges[0].node.childImageSharp.fluid} className="header-cataloage header-mid">
      <div className="header-cataloage_content">
        <Navigation className="navigation-cataloage" />
        <div className="header-filter" id="header-filter"></div>
        <p>{data.pageContext.slug.replace(/\//g, ' ')}</p>
      </div>
    </Header>
    {
      state.images.map((imageArr) => {
        return (
          <div className="produse-images">
            {
              imageArr.map((image, j) => (
                <span className={`produse-images-${j}`}><Image fluid={image.node.childImageSharp.fluid} /></span>
              ))
            }
          </div>
        )
      })
    }
    <BackgroundImage fluid={data.data.discover2.childImageSharp.fluid} className="discover-image">
      <div className="header-filter"></div>
      <p>Ai un plan? Contactează-ne</p>
      <Link to="/contact">Contact</Link>
    </BackgroundImage>

  </Layout >
}

export const query = graphql`
query ($slug:String!,$hero:String,$cataloage:String,$images:String){
    names:allFile(filter:{relativeDirectory:{eq:$slug}}){
    edges{
      node{
        name
      }
    }
  }
  discover2:file(relativePath:{eq:"discover2.png"}){
    childImageSharp{
      fluid(maxWidth:1600,maxHeight:750){
        ...GatsbyImageSharpFluid
      }
    }
  }
    hero:allFile(filter:{relativeDirectory:{eq:$hero}}){
      edges{
        node{
          childImageSharp{
            fluid(maxWidth:1600){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
   images:allFile(filter:{relativeDirectory:{eq:$images}}){
     edges{
       node{
         childImageSharp{
           fluid(maxWidth:300){
             ...GatsbyImageSharpFluid
           }
         }
       }
     }
   }

   cataloage:allFile(filter:{relativeDirectory:{eq:$cataloage}}){
    edges{
      node{
          extension
          publicURL
          name
          childImageSharp{
          fixed(width:200,height:300){
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
}
`