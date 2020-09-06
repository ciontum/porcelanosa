import React from 'react'
import Image from 'gatsby-image'
// const cataloageMocksBaie=[{image:TestPNG,primary:'Altissima',secondary:'PIATRA NATURALA'},{image:TestPNG,primary:'Altissima',secondary:'PIATRA NATURALA'},{image:TestPNG,primary:'Altissima',secondary:'PIATRA NATURALA'},{image:TestPNG,primary:'Altissima',secondary:'PIATRA NATURALA'},{image:TestPNG,primary:'Altissima',secondary:'PIATRA NATURALA'}]
const CataloageCategory=({name,cataloage})=>{
    console.log(cataloage)
    return(
        <div className="cataloage-category">
            <h2>{name}</h2>
            <hr />
            <div className="cataloage-category_content">
                {
                    cataloage.map(catalog=>{
                        return <div className="cataloage-category_content-group">
                            <Image fixed={catalog.image.childImageSharp.fixed} alt='catalog' />
                            <p className="cataloage-category_content-group-secondary">{catalog.secondary}</p>
                            <hr/>
                            <p>{catalog.primary}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default CataloageCategory