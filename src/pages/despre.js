import React, { useRef, useEffect, useState } from "react"
import Layout from "../components/Layout"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import DespreCard from "../components/Despre/DespreCard"

export default props => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef()

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <Layout>
      <Header image={props.data.cataloageHeader.childImageSharp.fluid} className="header-cataloage header-despre">
        <div className="header-cataloage_content">
          <Navigation className="navigation-cataloage" />
          <div className="header-filter" id="header-filter"></div>
          <p>DESPRE NOI</p>
        </div>
      </Header>
      {
        scrollRef.current && (scrollTop >= 200) && <div style={{ position: "absolute", top: "0px" }}>
          <Navigation />
        </div>
      }
      <DespreCard ref={scrollRef} />
    </Layout>
  )
}

export const query = graphql`
{
    cataloageHeader:file(relativePath:{eq:"despre-header.png"}) {
        childImageSharp {
          fluid(maxWidth:1600) {
            ...GatsbyImageSharpFluid
          }
        }
    }
}
`