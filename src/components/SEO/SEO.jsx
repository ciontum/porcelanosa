import React from "react"
import { Helmet } from "react-helmet"

const SEO = ({ title, description, canonical, robots }) => {
    return (
        <Helmet>
            <title>{title}</title >
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charset="UTF-8" />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={canonical} />
        </Helmet>
    )
}

export default SEO;