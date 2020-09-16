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

    const [mainActive, setMainActive] = useState('pardoseli')
    const [isShown] = useState(false)
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
        if (mainActive === 'pardoseli')
            return ["CERAMICĂ", "PORȚELAN", "LEMN NATURAL", "PIATRĂ NATURALĂ", "PARCHET-LAMINAT", "VINYL", "ADERENT"]

        if (mainActive === 'gresie-si-faianta')
            return ["CERAMICĂ", "PORȚELAN", "LEMN NATURAL", "PIATRĂ NATURALĂ", "PARCHET LAMINAT", "VINYL", "ADERENT", "MOZAIC", "KRION"]

        if (mainActive === 'bucatarie')
            return ["MOBILĂ", "CHIUVETE ROBINETE", "MESE DE LUCRU"]

        if (mainActive === 'baie')
            return ["MOBILĂ", "DUȘURI", "CĂZI", "CHIUVETE ROBINETE", 'TOALETE', "ACCESORII"]
            
        return []
    }

    const getImageByName = (name) => {
        let image = null
        image = allFile.edges.find(file => file.node.childImageSharp.fixed.originalName === name)
        return image
    }

    return (
        <div className={`products-menu ${className ? className : ''}`}>
            <div className="products-menu_first">
                <ul>
                    <li className={mainActive === "pardoseli" ? 'products-menu_active' : ''} onClick={() => setMainActive('pardoseli')}>
                        PARDOSELI
                    </li>

                    <li className={mainActive === "gresie-si-faianta" ? 'products-menu_active' : ''} onClick={() => setMainActive('gresie-si-faianta')}>
                        GRESIE ȘI FAIANȚĂ
                    </li>

                    <li className={mainActive === "bucatarie" ? 'products-menu_active' : ''} onClick={() => setMainActive('bucatarie')}>
                        BUCĂTĂRIE
                    </li>

                    <li className={mainActive === "baie" ? 'products-menu_active' : ''} onClick={() => setMainActive('baie')}>
                        BAIE
                    </li>

                    <li className={mainActive === "solutii-tehnice" ? 'products-menu_active' : ''} onClick={() => document.location.pathname = `produse/solutii-tehnice`}>
                        SOLUȚII TEHNICE
                    </li>
                </ul>
            </div>

            <div className="products-menu_second">
                <ul>
                    {
                        secondaryList && secondaryList.map(secondary => {
                            let link = secondary.replace("Ă", "A")
                            link = link.replace("Ș", "S")
                            link = link.replace("Ț", "T").toLowerCase()
                            return <a href='#' onClick={() => document.location.pathname = `produse/${mainActive}/${link.replace(/ /g, "-").toLowerCase()}`}>{secondary}</a>
                        })
                    }
                </ul>
            </div>

            <div className="products-menu_image">
                <Image fixed={mainActive === "pardoseli" ? getImageByName('pardoseli.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "gresie-si-faianta" ? getImageByName('gresiefaianta.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "bucatarie" ? getImageByName('bucatarie.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive === "baie" ? getImageByName('baie.png').node.childImageSharp.fixed : null} />
            </div>
        </div>

    )
}

export default ProductsMenu