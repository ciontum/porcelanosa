import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import PortfolioCard from "./PortfolioCard"
import styles from "./portfolio-card.module.scss"

const cards = graphql`
{
    allFile(filter: {relativeDirectory: {eq: "portofoliu"}, extension: {in: ["jpg", "jpeg", "png"]}}, sort: {order: ASC, fields: name}) {
    edges {
      node {
        name
        childImageSharp {
          fixed(width: 200, height: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
}
`

const PortfolioContent = React.forwardRef(({ }, ref) => {
  const data = useStaticQuery(cards)

  return <div className={styles.container} ref={ref}>
    {
      data.allFile.edges.map((edge, index) => (
        <PortfolioCard key={index} name={edge.node.name} image={edge.node.childImageSharp.fixed} />
      ))
    }
  </div>
})

export default PortfolioContent;