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

    const onHoverBegin = (e) => {
        var text = e.target.textContent

        if (text === 'GRESIE') {
            setMainActive('gresie')
        } else if (text === 'FAIANȚĂ') {
            setMainActive('faianta')
        } else if (text === 'PLĂCI CERAMICE') {
            setMainActive('placi-ceramice')
        } else if (text === 'PIATRĂ NATURALĂ') {
            setMainActive('piatra-naturala')
        } else if (text === 'PARCHET') {
            setMainActive('parchet')
        } else if (text === 'LINKFLOOR') {
            setMainActive('linkfloor')
        } else if (text === 'OBIECTE SANITARE') {
            setMainActive('obiecte-sanitare')
        } else if (text === 'MOBILIER') {
            setMainActive('mobilier')
        } else if (text === 'SOLUȚII TEHNICE') {
            setMainActive('solutii-tehnice')
        }
    }

    return (
        <div className={`products-menu ${className ? className : ''}`}>
            <div className="products-menu_first">
                <ul>
                    <Link to="/produse/gresie" className="link-no-decoration" onMouseEnter={onHoverBegin}>
                        <li className={mainActive === "gresie" ? 'products-menu_active' : ''}>
                            GRESIE
                        </li>
                    </Link>

                    <Link to="/produse/faianta" className="link-no-decoration" onMouseEnter={onHoverBegin}>
                        <li className={mainActive === "faianta" ? 'products-menu_active' : ''}>
                            FAIANȚĂ
                        </li>
                    </Link>

                    <Link to="/produse/placi-ceramice" className="link-no-decoration" onMouseEnter={onHoverBegin}>
                        <li className={mainActive === "placi-ceramice" ? 'products-menu_active' : ''}>
                            PLĂCI CERAMICE
                        </li>
                    </Link>

                    <Link to="/produse/piatra-naturala" className="link-no-decoration" onMouseEnter={onHoverBegin}>
                        <li className={mainActive === "piatra-naturala" ? 'products-menu_active' : ''}>
                            PIATRĂ NATURALĂ
                        </li>
                    </Link>

                    <li className={mainActive === "parchet" ? 'products-menu_active' : ''} onMouseEnter={onHoverBegin}>
                        PARCHET
                    </li>

                    <Link to="/produse/linkfloor" className="link-no-decoration" onMouseEnter={onHoverBegin}>
                        <li className={mainActive === "linkfloor" ? 'products-menu_active' : ''}>
                            LINKFLOOR
                        </li>
                    </Link>

                    <li className={mainActive === "obiecte-sanitare" ? 'products-menu_active' : ''} onMouseEnter={onHoverBegin}>
                        OBIECTE SANITARE
                    </li>
                    <li className={mainActive === "mobilier" ? 'products-menu_active' : ''} onMouseEnter={onHoverBegin}>
                        MOBILIER
                    </li>
                    <li className={mainActive === "solutii-tehnice" ? 'products-menu_active' : ''} onMouseEnter={onHoverBegin}>
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
                <Image fixed={mainActive === "gresie" ? getImageByName('gresie.jpg').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "faianta" ? getImageByName('faianta.jpg').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "placi-ceramice" ? getImageByName('placi-ceramice.jpg').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "piatra-naturala" ? getImageByName('piatra-naturala.jpg').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "parchet" ? getImageByName('parchet.jpg').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "linkfloor" ? getImageByName('linkfloor.jpg').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "obiecte-sanitare" ? getImageByName('obiecte-sanitare.jpg').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "mobilier" ? getImageByName('mobilier.jpg').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "solutii-tehnice" ? getImageByName('solutii-tehnice.jpg').node.childImageSharp.fixed : null} />
            </div>
        </div >

    )
}

export default ProductsMenu