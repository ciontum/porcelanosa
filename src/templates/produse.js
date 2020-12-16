import React, { useState, useRef, useEffect } from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/Layout'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import Image from "gatsby-image"
import "./styles.scss"
import BackgroundImage from 'gatsby-background-image'

export default data => {
  console.log(data)
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef()

  useEffect(() => {
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

    return {
      images,
      displayedName
    }
  })

  return <Layout>
    <Header image={data.data.hero.edges[0].node.childImageSharp.fluid} className="header-cataloage header-mid">
      <div className="header-cataloage_content">
        <Navigation className="navigation-cataloage" />
        <div className="header-filter" id="header-filter"></div>
        <p>{state.displayedName}</p>
      </div>
    </Header>
    {
      scrollRef.current && (scrollTop >= 200) && <div style={{ position: "absolute", top: "0px" }}>
        <Navigation />
      </div>
    }
    <div className="produse-images" ref={scrollRef}>
      {
        state.images.map((image) => (
          <span className="image_container"><Image fluid={image.node.childImageSharp.fluid} className="image" /></span>
        ))
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
          fluid(maxWidth:1600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
  images:allFile(filter:{relativeDirectory:{eq:$images}}) {
    edges {
      node {
        childImageSharp {
          fluid(maxWidth:300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}
`