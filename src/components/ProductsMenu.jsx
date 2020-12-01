import React, { useState, useEffect } from 'react'
import "./products-menu.scss"
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

const images = graphql`query{
    allFile(filter:{relativeDirectory:{eq:"menu"}})
    {
        edges{
            node{
                childImageSharp{
                    fixed(width:600,height:380){
                        ...GatsbyImageSharpFixed
                        originalName
                    }
                }
            }
        }
    }
}
  `

const ProductsMenu = ({ className }) => {

    const [mainActive, setMainActive] = useState('gresie')
    const [secondaryList, setSecondaryList] = useState(null)
    useEffect(() => {
        setSecondaryList(getSecondaryList())
    }, [mainActive])

    const { allFile } = useStaticQuery(images)
    useEffect(() => {
        document.getElementById('header-filter') && document.getElementById('header-filter').classList.add("dark-filter")
        return () => {
            document.getElementById('header-filter') && document.getElementById('header-filter').classList.remove('dark-filter')
        }
    }, [])

    const getSecondaryList = () => {
        if (mainActive === 'parchet')
            return ["LEMN NATURAL", "LAMINAT"]

        if (mainActive === 'obiecte-sanitare')
            return ["BATERII", "LAVOARE", "CĂZI", "COLOANE DUȘ", "STICLE DUȘ", "PLATOURI DUȘ", "RADIATOARE"]

        if (mainActive === 'mobilier')
            return ["BAIE", "BUCĂTĂRIE", "DRESING"]

        if (mainActive === 'solutii-tehnice')
            return ["PROFILE", "ADEZIVI", "SISTEME DUȘ", "FOLII IZOLANTE", "ÎNCĂLZIRE PARDOSEALĂ", "MICRO-STUK"]

        return []
    }

    const getImageByName = (name) => {
        return allFile.edges.find(file => file.node.childImageSharp.fixed.originalName === name)
    }

    return (
        <div className={`products-menu ${className ? className : ''}`}>
            <div className="products-menu_first">
                <ul>
                    <li className={mainActive === "gresie" ? 'products-menu_active' : ''} onClick={() => setMainActive('gresie')}>
                        <Link to="/produse/gresie">GRESIE</Link>
                    </li>

                    <li className={mainActive === "faianta" ? 'products-menu_active' : ''} onClick={() => setMainActive('faianta')}>
                        <Link to="/produse/faianta">FAIANȚĂ</Link>
                    </li>

                    <li className={mainActive === "placi-ceramice" ? 'products-menu_active' : ''} onClick={() => setMainActive('placi-ceramice')}>
                        <Link to="/produse/placi-ceramice">PLĂCI CERAMICE</Link>
                    </li>

                    <li className={mainActive === "piatra-naturala" ? 'products-menu_active' : ''} onClick={() => setMainActive('piatra-naturala')}>
                        <Link to="/produse/piatra-naturala">PIATRĂ NATURALĂ</Link>
                    </li>
                    <li className={mainActive === "parchet" ? 'products-menu_active' : ''} onClick={() => setMainActive('parchet')}>
                        PARCHET
                    </li>
                    <li className={mainActive === "linkfloor" ? 'products-menu_active' : ''} onClick={() => setMainActive('linkfloor')}>
                        <Link to="/produse/linkfloor">LINKFLOOR</Link>
                    </li>
                    <li className={mainActive === "obiecte-sanitare" ? 'products-menu_active' : ''} onClick={() => setMainActive('obiecte-sanitare')}>
                        OBIECTE SANITARE
                    </li>
                    <li className={mainActive === "mobilier" ? 'products-menu_active' : ''} onClick={() => setMainActive('mobilier')}>
                        MOBILIER
                    </li>
                    <li className={mainActive === "solutii-tehnice" ? 'products-menu_active' : ''} onClick={() => setMainActive('solutii-tehnice')}>
                        SOLUȚII TEHNICE
                    </li>
                </ul>
            </div>

            <div className={secondaryList && secondaryList.length > 0 ? "products-menu_second" : "products-menu_second-empty"}>
                <ul>
                    {
                        secondaryList && secondaryList.map(secondary => {
                            let link = secondary.replace(/Ă/g, "A")
                            link = link.replace("Ș", "S")
                            link = link.replace("Î", "I")
                            link = link.replace("Ț", "T").toLowerCase()
                            return <a href='#' onClick={() => document.location.pathname = `produse/${mainActive}/${link.replace(/ /g, "-").toLowerCase()}`}>{secondary}</a>
                        })
                    }
                </ul>
            </div>

            <div className="products-menu_image">
                <Image fixed={mainActive === "gresie" ? getImageByName('pardoseli.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "faianta" ? getImageByName('gresiefaianta.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "placi-ceramice" ? getImageByName('bucatarie.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "piatra-naturala" ? getImageByName('baie.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "parchet" ? getImageByName('baie.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "linkfloor" ? getImageByName('baie.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "obiecte-sanitare" ? getImageByName('baie.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "mobilier" ? getImageByName('baie.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "solutii-tehnice" ? getImageByName('baie.png').node.childImageSharp.fixed : null} />
            </div>
        </div>

    )
}

export default ProductsMenu