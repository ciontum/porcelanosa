import React, { useRef, useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Navigation from '../components/Navigation/Navigation'
import Layout from '../components/Layout/Layout'
import CataloageOpen from '../components/Cataloage/CataloageOpen'
import { DismissMenuContext } from "../utils/context"

export default props => {
    const [showSecondNav, setShowSecondNav] = useState(false)
    const [scrollTop, setScrollTop] = useState(0);
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

    return (
        <Layout>
            <Header image={props.data.cataloageHeader.childImageSharp.fluid} className="header-cataloage">
                <div className="header-cataloage_content">
                    <DismissMenuContext.Provider value={{ showSecondNav: !showSecondNav, setShowSecondNav }}>
                        <Navigation className="navigation-cataloage" />
                    </DismissMenuContext.Provider>
                    <div className="header-filter" id="header-filter"></div>
                    <p>COLECȚIILE PORCELANOSA</p>
                </div>
            </Header>
            {
                scrollRef.current && (scrollTop >= 200) && <div style={{ position: "absolute", top: "0px" }}>
                    <DismissMenuContext.Provider value={{ showSecondNav, setShowSecondNav }}>
                        <Navigation />
                    </DismissMenuContext.Provider>
                </div>
            }
            <CataloageOpen ref={scrollRef} />
        </Layout>
    )
}

export const query = graphql`
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