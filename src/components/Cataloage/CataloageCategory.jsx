import React from 'react'
import Image from 'gatsby-image'
import { Link } from "gatsby"

const CataloageCategory = ({ name, cataloage }) => {
    return (
        <div className="cataloage-category">
            <h2>{name}</h2>
            <hr />

            <div className="cataloage-category_content">
                {
                    cataloage.map((catalog, index) => {
                        return <div className="cataloage-category_content-group">
                            <Link to={"/cataloage-open#" + [name.toLowerCase().replace(/[\s]/g, '-'), catalog.primary.replace(/[\s]/g, '-').toLowerCase()].join('_')}
                                onClick={() => window.scrollTo(0, 0)}>
                                <Image fixed={catalog.image.childImageSharp.fixed} alt='catalog' />
                                <p className="cataloage-category_content-group-secondary">{catalog.secondary}</p>
                            </Link>
                            <hr />
                            <p>{catalog.primary}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}


export default CataloageCategory