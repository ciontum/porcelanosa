import React, { useState, useRef, useEffect } from "react"
import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import Navigation from '../components/Navigation/Navigation'
import BackgroundImage from 'gatsby-background-image'
import { graphql, Link } from "gatsby"
import { DismissMenuContext } from "../utils/context"
import styles from "./produse-subcategorii.module.scss"
import "./styles.scss"
import SEO from "../components/SEO/SEO"
import ZoomedImage from "../components/ZoomedImage/ZoomedImage"

export default data => {
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

    const [state] = useState(() => {
        const imagesBaie = data.data.images1.edges
        const imagesBucatarie = data.data.images2.edges

        return {
            categories: data.pageContext.categories,
            displayedName: 'Baterii',
            imagesBaie,
            imagesBucatarie
        }
    })

    const [idx, setIndex] = useState(0)

    return (
        <Layout>
            <SEO title="Baterii | Maison Design"
                description="Alege din cea mai variata gama de baterii de baie sau bucatarie, de la Maison Design"
                canonical="http://www.maisondesign.ro/produse/obiecte-sanitare/baterii" robots="index, follow" />
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
                    <DismissMenuContext.Provider value={{ showSecondNav: showSecondNav, setShowSecondNav }}>
                        <Navigation />
                    </DismissMenuContext.Provider>
                </div>
            }
            <div className={styles.categories} ref={scrollRef}>
                {
                    state.categories.map((category, index) => (
                        <div key={index} className={idx === index ? styles.category_clicked : styles.category} onClick={() => setIndex(index)}>
                            <span>{category}</span>
                        </div>
                    ))
                }
            </div>
            <div className={styles.produse_images}>
                {
                    idx === 0 ?
                        state.imagesBaie.map(image => <ZoomedImage image={image.node.childImageSharp.fluid} text={image.node.name} />)
                        :
                        state.imagesBucatarie.map(image => <ZoomedImage image={image.node.childImageSharp.fluid} text={image.node.name} />)
                }
            </div>
            <BackgroundImage fluid={data.data.discover2.childImageSharp.fluid} className="discover-image">
                <div className="header-filter"></div>
                <p>Ai un plan? Contactează-ne</p>
                <Link to="/contact">Contact</Link>
            </BackgroundImage>
        </Layout >
    )
}

export const query = graphql`
query ($slug:String!,$hero:String,$images1:String,$images2:String) {
    names:allFile(filter:{relativeDirectory:{eq:$slug}}) {
        edges{
            node{
                name
            }
        }
    }
    discover2:file(relativePath:{eq:"discover2.png"}) {
        childImageSharp{
            fluid(maxWidth:1600,maxHeight:750){
                ...GatsbyImageSharpFluid
            }
        }
    }
    hero:allFile(filter:{relativeDirectory:{eq:$hero}}) {
        edges{
            node{
                childImageSharp{
                    fluid(quality: 100, jpegQuality: 100, pngQuality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
    images1:allFile(filter:{relativeDirectory:{eq:$images1}}, sort: {order: ASC, fields: childImageSharp___resolutions___height}) {
        edges{
            node{
                childImageSharp{
                    fluid(quality: 100, jpegQuality: 100, pngQuality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
                name
            }
        }
   },
   images2:allFile(filter:{relativeDirectory:{eq:$images2}}, sort: {order: ASC, fields: childImageSharp___resolutions___height}) {
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