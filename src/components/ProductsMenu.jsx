import React, { useState, useEffect } from 'react'
import "./products-menu.scss"
import { useCallback } from 'react'
import { useStaticQuery,graphql} from 'gatsby'
import Image from 'gatsby-image'
const images=graphql`query{
    allFile(filter:{relativeDirectory:{eq:"menu"}})
{
    edges{
      node{
        childImageSharp{
          fixed(width:800,height:380){
            ...GatsbyImageSharpFixed
            originalName
          }
        }
      }
    }
}
}
  `

const ProductsMenu=({className})=>{
    
    const [mainActive,setMainActive]=useState("isPardoseli")
    const [secondaryList,setSecondaryList]=useState(null)
    useEffect(()=>{
        setSecondaryList(getSecondaryList())
    },[mainActive])
    const {allFile}=useStaticQuery(images)
    useEffect(() => {
        document.getElementById('header-filter').classList.add("dark-filter")
        return () => {
            document.getElementById('header-filter').classList.remove('dark-filter')
        }
    }, [])
    const getSecondaryList=()=>{
        if(mainActive==='isPardoseli')
        return ["CERAMICA","PORTELAN","LEMN NATURAL","PIATRA NATURALA","PARCHET LAMINAT","VINYL","ADERENT"]

        if(mainActive==="isGresie")
        return ['CERAMICA','PORTELAN','LEMN NATURAL',"PIATRA NATURALA","PARCHET LAMINAT","VINYL","ADERENT",'MOZAIC',"KRION"]

        if(mainActive==="isBucatarie")
        return ['MOBILA',"ROBINETE","MESE DE LUCRU",'CHIUVETE']

        if(mainActive==='isBaie')
        return ['MOBILA','DUSURI','CAZI','RADIATOARE',"ROBINETE",'CHIUVETE','TOALETE','ACCESORII']
        return []
    }
    const getImageByName=(name)=>{

        let image=null
        image= allFile.edges.find(file=>file.node.childImageSharp.fixed.originalName===name)
        return image
    }
    return (
        <div className={`products-menu ${className ? className : ''}`}>
            <div className="products-menu_first">
                <ul>
                    <li className={mainActive==="isPardoseli" ? 'products-menu_active' : ''} onClick={()=>setMainActive('isPardoseli')}>
                        PARDOSELI
                    </li>

                    <li className={mainActive==="isGresie" ? 'products-menu_active' : ''} onClick={()=>setMainActive('isGresie')}>
                        GRESIE SI FAIANTA
                    </li>

                    <li className={mainActive==="isBucatarie" ? 'products-menu_active' : ''} onClick={()=>setMainActive('isBucatarie')}>
                        BUCATARIEE
                    </li>

                    <li className={mainActive==="isBaie" ? 'products-menu_active' : ''} onClick={()=>setMainActive('isBaie')}>
                        BAIE
                    </li>
                </ul>
            </div>

            <div className="products-menu_second">
                <ul>
                {
                    secondaryList && secondaryList.map(secondary=>{
                    return <li>{secondary}</li>
                    })
                }
                </ul>
            </div>

            <div className="products-menu_image">
                <Image fixed={mainActive==="isPardoseli" ? getImageByName('pardoseli.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive==="isGresie" ? getImageByName('gresie si faianta.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive==="isBucatarie" ? getImageByName('bucatarie.png').node.childImageSharp.fixed : null} />
                <Image fixed={mainActive==="isBaie" ?  getImageByName('baie.png').node.childImageSharp.fixed : null } />
            </div>
        </div>

    )
}

export default ProductsMenu