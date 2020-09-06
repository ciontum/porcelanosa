import React, { useRef, useState, useEffect } from "react"
import Layout from "../components/Layout"
import Header from "../components/Header"
import HomeNavigation from "../components/Home/HomeNavigation"
import Scroll from "../components/Home/Scroll"
import Image from "gatsby-image"
import BackgroundImage from "gatsby-background-image"
import Navigation from "../components/Navigation"

export default props=> {

  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef=useRef()
  const [firstScrollElements,f]=useState(()=>{
    const firstScroll=props.data.firstScroll.edges.map(scroll=>{
      return {
        image:scroll.node.childImageSharp.fixed,
        name:scroll.node.childImageSharp.fixed.originalName
      }
    })
    
    return firstScroll
  })
  const [secondScrollElements,f2]=useState(()=>{
    const wNull=props.data.secondScroll.edges.filter(edge=>edge.node.childImageSharp)
    const secondScroll=wNull.sort((a,b)=>{
      const replacedA=Number(a.node.childImageSharp.fixed.originalName.replace(/.(jpeg|png|gif)/,""))
      const replacedB=Number(b.node.childImageSharp.fixed.originalName.replace(/.(jpeg|png|gif)/,""))
      
      return replacedA-replacedB
    })

    return secondScroll
  })

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
      console.log(scrollRef)
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  
  return (
  <Layout>
    
    {scrollRef.current && (scrollTop >= scrollRef.current.offsetTop) && 
    <Navigation />}
    <div className="header-container">
    <Header image={props.data.homeHeaders.edges[0].node.childImageSharp.fluid} >
      <div className="header-content">
      <div className="header-filter" id="header-filter"></div>
      <HomeNavigation classNameLinks="navigation-links-home"/>
      <div className="header-bottom">
        <p>DESIGN.</p>
        <p>LUX.</p>
        <p>INOVATIE.</p>
        </div> 
      </div>
    </Header>
    </div>

    <Scroll title="Descoperă" subTitle="Miile de produse disponibile" scrollRef={scrollRef} >
        <div className="scroll_content">
            {
              firstScrollElements.map(scroll=>{
                scroll.name=scroll.name.replace(/.png/,'')
                return <div className="scroll_content-group">
                    <Image fixed={scroll.image} alt="scroll"/>
                    <h3>{scroll.name}</h3>
                    <hr/>
                  </div>
              })
            }
        </div>
    </Scroll>
    <Scroll title="Fii inspirat" subTitle="Exploreaza produsele,designul si maiestria Porcelanosa" className="scroll_background">
       <div className="scroll_full-content">
            {
              secondScrollElements.map(scroll=>{
                return <Image fixed={scroll.node.childImageSharp && scroll.node.childImageSharp.fixed} alt="scroll" />
              })
            }
       </div>
    </Scroll>
    <BackgroundImage fluid={props.data.discover.childImageSharp.fluid} className="discover-image">
    <div className="header-filter"></div>
      <p>VREI SA DESCOPERI MAI <span>MULTE ?</span></p>
      <a>CATALOAGE</a>
    </BackgroundImage>
  </Layout>
  )
}

export const query=graphql`
{
  homeHeaders:allFile(filter:{relativeDirectory:{eq:"hero"}}){
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

  firstScroll:allFile(filter:{relativeDirectory:{eq:"scroll"}}){
    edges{
      node{
        childImageSharp{
          fixed(width:350,height:380){
            ...GatsbyImageSharpFixed
            originalName
          }
        }
      }
    }
  }

  secondScroll:allFile(filter:{relativeDirectory:{eq:"scroll2"}}){
    edges{
      node{
        childImageSharp{
          fixed(width:317,height:317){
            ...GatsbyImageSharpFixed
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
