import React, { useRef, useState, useEffect } from "react"
import Layout from "../components/Layout/Layout"
import { Helmet } from "react-helmet"
import Scroll from "../components/Home/Scroll"
import Image from "gatsby-image"
import BackgroundImage from "gatsby-background-image"
import Navigation from "../components/Navigation/Navigation"
import { Link } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links";
import Fade from "../components/Navigation/Home/Fade"
import { DismissMenuContext } from "../utils/context"

export default props => {
  const [showSecondNav, setShowSecondNav] = useState(false)
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef()

  const [firstScrollElements] = useState(() => {
    const firstScroll = props.data.firstScroll.edges.map(scroll => {
      const name = scroll.node.childImageSharp.fluid.originalName
      let hash = name.replace(/[\s]/g, '-').replace(".png", "").toLowerCase()
      if (hash === 'pardoseala')
        hash = 'gresie-si-faianta'

      return {
        image: scroll.node.childImageSharp.fluid,
        name,
        hash
      }
    })

    return firstScroll
  })

  const [secondScrollElements] = useState(() => {
    const wNull = props.data.secondScroll.edges.filter(edge => edge.node.childImageSharp)
    const secondScroll = wNull.sort((a, b) => {
      const replacedA = Number(a.node.childImageSharp.fluid.originalName.replace(/.(jpeg|png|gif)/, ""))
      const replacedB = Number(b.node.childImageSharp.fluid.originalName.replace(/.(jpeg|png|gif)/, ""))

      return replacedA - replacedB
    })

    return secondScroll
  })

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

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Maison Design</title>
      </Helmet>
      <Layout>
        <div className="header-container">
          <DismissMenuContext.Provider value={{ showSecondNav: !showSecondNav, setShowSecondNav }}>
            <Fade />
          </DismissMenuContext.Provider>
        </div>
        {
          scrollRef.current && (scrollTop >= 740) && <div style={{ position: "absolute", top: "0px" }}>
            <DismissMenuContext.Provider value={{ showSecondNav: showSecondNav, setShowSecondNav }}>
              <Navigation />
            </DismissMenuContext.Provider>
          </div>
        }
        <Scroll title="Descoperă" subTitle="Miile de produse disponibile" scrollRef={scrollRef} >
          <div className="scroll_content">
            {
              firstScrollElements.map(scroll => {
                scroll.name = scroll.name.replace(/.png/, '')
                return <div className="scroll_content-group" >
                  <AnchorLink to={"/cataloage#" + scroll.hash}>
                    <Image fluid={scroll.image} alt="scroll" className="scroll_full-content_image" />
                  </AnchorLink>
                  <h3>{scroll.name}</h3>
                  <hr />
                </div>
              })
            }
          </div>
        </Scroll>
        <Scroll title="Fii inspirat" subTitle="Explorează produsele,designul și măiestria Porcelanosa" className="scroll_background">
          <div className="scroll_full-content">
            {
              secondScrollElements.map(scroll => {
                return <Image fluid={scroll.node.childImageSharp.fluid} alt="scroll" className="scroll_full-content_image" />
              })
            }
          </div>
        </Scroll>
        <BackgroundImage fluid={props.data.discover.childImageSharp.fluid} className="discover-image">
          <div className="header-filter"></div>
          <p>VREI SĂ DESCOPERI MAI <span>MULTE ?</span></p>
          <Link to="/cataloage">CATALOAGE</Link>
        </BackgroundImage>
      </Layout>
    </>
  )
}

export const query = graphql`
{
  homeHeaders:allFile(filter:{relativeDirectory:{eq:"hero"}}){
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

  firstScroll:allFile(filter:{relativeDirectory:{eq:"scroll"}}){
    edges{
      node{
        childImageSharp{
          fluid {
            ...GatsbyImageSharpFluid
            originalName
          }
        }
      }
    }
  }

  secondScroll:allFile(filter:{relativeDirectory:{eq:"scroll2"}}) {
    edges {
      node {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
            originalName
          }
        }
      }
    }
  }
  discover:file(relativePath:{eq:"discover.png"}){
    childImageSharp{
      fluid(maxWidth:1600,maxHeight:750){
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`