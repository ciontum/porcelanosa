import React, { useState, useEffect } from 'react'
import "./products-menu.scss"
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

const images = graphql`query{
    allFile(filter:{relativeDirectory:{eq:"menu"}})
    {
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
            return ["BATERII", "LAVOARE", "CĂZI", "COLOANE DUȘ", "RAIN SHOWER", "STICLE DUȘ", "PLATOURI DUȘ", "RADIATOARE"]

        if (mainActive === 'mobilier')
            return ["BAIE", "BUCĂTĂRIE"]

        if (mainActive === 'solutii-tehnice')
            return ["PROFILE", "ADEZIVI", "FOLII IZOLANTE", "ÎNCĂLZIRE PARDOSEALĂ"]

        return []
    }

    const getImageByName = (name) => {
        return allFile.edges.find(file => file.node.childImageSharp.fluid.originalName === name)
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
                    <li className={mainActive === "gresie" ? 'products-menu_active' : ''} onMouseEnter={onHoverBegin}>
                        <Link to="/produse/gresie" className="link-no-decoration">
                            GRESIE
                        </Link>
                    </li>

                    <li className={mainActive === "faianta" ? 'products-menu_active' : ''} onMouseEnter={onHoverBegin}>
                        <Link to="/produse/faianta" className="link-no-decoration">
                            FAIANȚĂ
                        </Link>
                    </li>

                    <li className={mainActive === "placi-ceramice" ? 'products-menu_active' : ''} onMouseEnter={onHoverBegin}>
                        <Link to="/produse/placi-ceramice" className="link-no-decoration">
                            PLĂCI CERAMICE
                        </Link>
                    </li>

                    <li className={mainActive === "piatra-naturala" ? 'products-menu_active' : ''} onMouseEnter={onHoverBegin}>
                        <Link to="/produse/piatra-naturala" className="link-no-decoration">
                            PIATRĂ NATURALĂ
                        </Link>
                    </li>

                    <li className={mainActive === "parchet" ? 'products-menu_active' : ''} onMouseEnter={onHoverBegin}>
                        PARCHET
                    </li>

                    <li className={mainActive === "linkfloor" ? 'products-menu_active' : ''} onMouseEnter={onHoverBegin}>
                        <Link to="/produse/linkfloor" className="link-no-decoration">
                            LINKFLOOR
                        </Link>
                    </li>

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
                                return <Link to={"/produse/" + mainActive + "/" + link.replace(/ /g, "-").toLowerCase()}> {secondary}</Link>
                            })
                        }
                    </ul>

                }
            </div>

            <div className="products-menu_image">
                <div id="img-faianta" className="img-gatsby">
                    <Image fluid={getImageByName('faianta.jpg').node.childImageSharp.fluid} />
                </div>
                <div id="img-placi-ceramice" className="img-gatsby">
                    <Image fluid={getImageByName('placi-ceramice.jpg').node.childImageSharp.fluid} />
                </div>
                <div id="img-piatra-naturala" className="img-gatsby">
                    <Image fluid={getImageByName('piatra-naturala.jpg').node.childImageSharp.fluid} />
                </div>
                <div id="img-parchet" className="img-gatsby">
                    <Image fluid={getImageByName('parchet.jpg').node.childImageSharp.fluid} />
                </div>
                <div id="img-linkfloor" className="img-gatsby">
                    <Image fluid={getImageByName('linkfloor.jpg').node.childImageSharp.fluid} />
                </div>
                <div id="img-obiecte-sanitare" className="img-gatsby">
                    <Image fluid={getImageByName('obiecte-sanitare.jpg').node.childImageSharp.fluid} />
                </div>
                <div id="img-mobilier" className="img-gatsby">
                    <Image fluid={getImageByName('mobilier.jpg').node.childImageSharp.fluid} />
                </div>
                <div id="img-solutii-tehnice" className="img-gatsby">
                    <Image fluid={getImageByName('solutii-tehnice.jpg').node.childImageSharp.fluid} />
                </div>
                <div id="img-gresie" className="img-gatsby">
                    <Image fluid={getImageByName('gresie.jpg').node.childImageSharp.fluid} />
                </div>
            </div>
        </div >

    )
}

export default ProductsMenu