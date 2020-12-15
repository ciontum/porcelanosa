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

const ProductsMenu = ({ className, isHome }) => {

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

    const changeImageOpacity = (currentImage) => {
        const imageIds = ['img-gresie', 'img-faianta', 'img-placi-ceramice', 'img-piatra-naturala', 'img-parchet', 'img-linkfloor',
            'img-obiecte-sanitare', 'img-mobilier', 'img-solutii-tehnice']

        for (let i = 0; i < imageIds.length; i++) {
            var img = document.getElementById(imageIds[i])
            if (imageIds[i] === currentImage) {
                img.style.opacity = 1
            } else {
                img.style.opacity = 0
            }
        }
    }

    const onHoverBegin = (e) => {
        var text = e.target.textContent

        if (text === 'GRESIE') {
            setMainActive('gresie')
            changeImageOpacity('img-gresie')
        } else if (text === 'FAIANȚĂ') {
            setMainActive('faianta')
            changeImageOpacity('img-faianta')
        } else if (text === 'PLĂCI CERAMICE') {
            setMainActive('placi-ceramice')
            changeImageOpacity('img-placi-ceramice')
        } else if (text === 'PIATRĂ NATURALĂ') {
            setMainActive('piatra-naturala')
            changeImageOpacity('img-piatra-naturala')
        } else if (text === 'PARCHET') {
            setMainActive('parchet')
            changeImageOpacity('img-parchet')
        } else if (text === 'LINKFLOOR') {
            setMainActive('linkfloor')
            changeImageOpacity('img-linkfloor')
        } else if (text === 'OBIECTE SANITARE') {
            setMainActive('obiecte-sanitare')
            changeImageOpacity('img-obiecte-sanitare')
        } else if (text === 'MOBILIER') {
            setMainActive('mobilier')
            changeImageOpacity('img-mobilier')
        } else if (text === 'SOLUȚII TEHNICE') {
            setMainActive('solutii-tehnice')
            changeImageOpacity('img-solutii-tehnice')
        }
    }

    return (
        <div className={`products-menu ${className ? className : (isHome ? 'home' : '')}`}>
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
                {
                    secondaryList &&
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

                }
            </div>

            <div className="products-menu_image">
                <div id="img-faianta" className="img-gatsby">
                    <Image fixed={getImageByName('faianta.jpg').node.childImageSharp.fixed} />
                </div>
                <div id="img-placi-ceramice" className="img-gatsby">
                    <Image fixed={getImageByName('placi-ceramice.jpg').node.childImageSharp.fixed} />
                </div>
                <div id="img-piatra-naturala" className="img-gatsby">
                    <Image fixed={getImageByName('piatra-naturala.jpg').node.childImageSharp.fixed} />
                </div>
                <div id="img-parchet" className="img-gatsby">
                    <Image fixed={getImageByName('parchet.jpg').node.childImageSharp.fixed} />
                </div>
                <div id="img-linkfloor" className="img-gatsby">
                    <Image fixed={getImageByName('linkfloor.jpg').node.childImageSharp.fixed} />
                </div>
                <div id="img-obiecte-sanitare" className="img-gatsby">
                    <Image fixed={getImageByName('obiecte-sanitare.jpg').node.childImageSharp.fixed} />
                </div>
                <div id="img-mobilier" className="img-gatsby">
                    <Image fixed={getImageByName('mobilier.jpg').node.childImageSharp.fixed} />
                </div>
                <div id="img-solutii-tehnice" className="img-gatsby">
                    <Image fixed={getImageByName('solutii-tehnice.jpg').node.childImageSharp.fixed} />
                </div>
                <div id="img-gresie" className="img-gatsby">
                    <Image fixed={getImageByName('gresie.jpg').node.childImageSharp.fixed} />
                </div>
            </div>
        </div >

    )
}

export default ProductsMenu