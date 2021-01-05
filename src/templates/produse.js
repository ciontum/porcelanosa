import React, { useState, useRef, useEffect } from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import Navigation from '../components/Navigation/Navigation'
import "./styles.scss"
import BackgroundImage from 'gatsby-background-image'
import ZoomedImage from "../components/ZoomedImage/ZoomedImage"
import SEO from "../components/SEO/SEO"
import { DismissMenuContext } from "../utils/context"
import 'react-medium-image-zoom/dist/styles.css'

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
    const metaCanonical = "http://www.maisondesign.ro/" + data.pageContext.slug

    return {
      images,
      displayedName,
      metaCanonical
    }
  })

  return <Layout>
    <SEO title={state.displayedName.toUpperCase() + " | Maison Design"}
      description="Alege cele mai bune produse marca Porcelanosa"
      canonical={state.metaCanonical} robots="index, follow" />
    <Header image={data.data.hero.edges[0].node.childImageSharp.fluid} className="header-cataloage header-mid">
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
        state.images.map(image => <ZoomedImage image={image.node.childImageSharp.fluid} text={image.node.name} />)
      }
    </div>
    <BackgroundImage fluid={data.data.discover2.childImageSharp.fluid} className="discover-image">
      <div className="header-filter"></div>
      <p>Ai un plan? Contactează-ne</p>
      <Link to="/contact">Contact</Link>
    </BackgroundImage>
  </Layout >
}

export const query = graphql`
query ($slug:String!,$hero:String,$images:String){
  names:allFile(filter:{relativeDirectory:{eq:$slug}}) {
    edges {
      node {
        name
      }
    }
  }
  discover2:file(relativePath:{eq:"discover2.png"}) {
    childImageSharp {
      fluid(maxWidth:1600,maxHeight:750) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  hero:allFile(filter:{relativeDirectory:{eq:$hero}}) {
    edges {
      node {
        childImageSharp {
          fluid(quality: 100, jpegQuality: 100, pngQuality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
  images: allFile(filter: {relativeDirectory: {eq: $images}}, sort: {order: ASC, fields: childImageSharp___resolutions___height}) {
    edges {
      node {
        childImageSharp {
          fluid(quality: 100, jpegQuality: 100, pngQuality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
        name
      }
    }
  }
}
`