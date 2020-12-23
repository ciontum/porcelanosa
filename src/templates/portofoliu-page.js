import React, { useState, useRef, useEffect } from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import Navigation from '../components/Navigation/Navigation'
import Image from "gatsby-image"
import "./styles.scss"
import BackgroundImage from 'gatsby-background-image'
import SEO from "../components/SEO/SEO"
import { DismissMenuContext } from "../utils/context"

export default data => {
  const [scrollTop, setScrollTop] = useState(0);
  const [showSecondNav, setShowSecondNav] = useState(false)
  const scrollRef = useRef()

  useEffect(() => {
    if (scrollTop >= 200) {
      setShowSecondNav(true)
    } else {
      setShowSecondNav(false)
    }

    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  const [state] = useState(() => {
    const images = data.data.images.edges
    const pageName = data.pageContext.slug.split('/')
    const displayedName = pageName[pageName.length - 1].replace(/-/g, ' ')
    const description = data.data.description.edges[0].node.childMarkdownRemark.html
    const metaDescription = data.data.description.edges[0].node.childMarkdownRemark.plainText

    return {
      images,
      displayedName,
      description,
      metaDescription
    }
  })

  return <Layout>
    <SEO title={state.displayedName.toUpperCase() + " | Maison Design"}
      description={state.metaDescription}
      canonical={"http://www.maisondesign.ro" + window.location.pathname} robots="index, follow" />
    <Header image={data.data.discover2.childImageSharp.fluid} className="header-cataloage header-mid">
      <div className="header-cataloage_content">
        <DismissMenuContext.Provider value={{ showSecondNav: !showSecondNav, setShowSecondNav }}>
          <Navigation className="navigation-cataloage" />
        </DismissMenuContext.Provider>
        <div className="header-filter" id="header-filter"></div>
        <p>{state.displayedName}</p>
      </div>
    </Header>
    {
      scrollRef.current && (scrollTop >= 200) && <div style={{ position: "absolute", top: "0px" }}>
        <DismissMenuContext.Provider value={{ showSecondNav, setShowSecondNav }}>
          <Navigation />
        </DismissMenuContext.Provider>
      </div>
    }
    <div className="produse-images" ref={scrollRef}>
      {
        state.images.map((image) => (
          <span className="image_container"><Image fluid={image.node.childImageSharp.fluid} className="image" /></span>
        ))
      }
    </div>
    {
      state.description &&
      <div className="page-description">
        <p dangerouslySetInnerHTML={{ __html: state.description }} />
      </div>
    }
    <BackgroundImage fluid={data.data.discover2.childImageSharp.fluid} className="discover-image">
      <div className="header-filter"></div>
      <p>Ai un plan? Contactează-ne</p>
      <Link to="/contact">Contact</Link>
    </BackgroundImage>
  </Layout >
}

export const query = graphql`
query ($slug:String!){
  discover2:file(relativePath:{eq:"discover2.png"}) {
    childImageSharp {
      fluid(maxWidth:1600,maxHeight:750) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  images: allFile(filter: {relativeDirectory: {eq: $slug}, extension: {in: ["jpg", "jpeg", "png"]}}, sort: {order: ASC, fields: name}) {
    edges {
      node {
        name
        childImageSharp {
          fluid(quality: 100, pngQuality: 100, jpegQuality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
  description: allFile(filter: {relativeDirectory: {eq: $slug}, extension: {eq: "md"}}, limit: 1) {
    edges {
      node {
        name
        childMarkdownRemark {
          html
          plainText
        }
      }
    }
  }
}
`