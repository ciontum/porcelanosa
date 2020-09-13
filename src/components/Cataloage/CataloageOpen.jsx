import React, { useState } from 'react'
import styles from "./cataloage-open.module.scss"
import CatalogCard from "./CatalogCard"
import { graphql, useStaticQuery } from "gatsby"

const cataloage = graphql`
{
cataloageBaie:allFile(filter:{relativeDirectory:{eq:"cataloage/Baie"}}){
    edges{
      node{
          extension
          publicURL
          name
          childImageSharp{
          fixed(width:200,height:300){
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }

  cataloageBucatarie:allFile(filter:{relativeDirectory:{eq:"cataloage/Bucatarie"}}){
    edges{
      node{
          extension
          publicURL
          name
          childImageSharp{
          fixed(width:200,height:300){
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }

  cataloageMobila:allFile(filter:{relativeDirectory:{eq:"cataloage/Mobila"}}){
    edges{
      node{
          extension
          publicURL
          name
          childImageSharp{
          fixed(width:200,height:300){
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }

  pardoseli:allFile(filter:{relativeDirectory:{eq:"cataloage/Pardoseli, Gresie si Faianta"}}){
    edges{
      node{
          extension
          publicURL
          name
          childImageSharp{
          fixed(width:200,height:300){
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }

  solutiiTehnice:allFile(filter:{relativeDirectory:{eq:"cataloage/Solutii tehnice"}}){
    edges{
      node{
          extension
          publicURL
          name
          childImageSharp{
          fixed(width:200,height:300){
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
}
`

const CataloageOpen = () => {
  const formatCataloageArr = (cataloageArr) => {
    const pdfs = cataloageArr.filter(catalog => catalog.node.extension === 'pdf')
    const images = cataloageArr.filter(catalog => catalog.node.extension === 'png')

    const cataloage = pdfs.map(pdf => {
      const myImage = images.filter(image => image.node.name === pdf.node.name)[0]

      return {
        image: myImage ? myImage.node : { childImageSharp: { fixed: null } },
        pdf: myImage ? pdf.node.publicURL : null,
        primary: myImage ? pdf.node.name : null
      }
    })

    return cataloage
  }

  const { cataloageBaie, cataloageBucatarie, cataloageMobila, pardoseli, solutiiTehnice } = useStaticQuery(cataloage)

  const [cataloageArr] = useState(() => {
    const cataloageBaieArr = formatCataloageArr(cataloageBaie.edges)

    const cataloageBucatarieArr = formatCataloageArr(cataloageBucatarie.edges)

    const cataloageMobilaArr = formatCataloageArr(cataloageMobila.edges)

    const cataloagePardoseliArr = formatCataloageArr(pardoseli.edges)


    const cataloageTehniceArr = formatCataloageArr(solutiiTehnice.edges)
    return {
      cataloageBaie: cataloageBaieArr,
      cataloageBucatarie: cataloageBucatarieArr,
      cataloageMobila: cataloageMobilaArr,
      cataloagePardoseli: cataloagePardoseliArr,
      cataloageTehnice: cataloageTehniceArr
    }
  })

  const [currentPDF, setCurrentPDf] = useState(() => {

  })

  function changePDF(subtitle, index) {
    if (subtitle === "Baie")
      setCurrentPDf(cataloageArr.cataloageBaie[index].pdf);
    else if (subtitle === "Bucatarie")
      setCurrentPDf(cataloageArr.cataloageBucatarie[index].pdf);
    else if (subtitle === "Mobila")
      setCurrentPDf(cataloageArr.cataloageMobila[index].pdf);
    else if (subtitle === "Solutii tehnice")
      setCurrentPDf(cataloageArr.cataloageTehnice[index].pdf);
    else
      setCurrentPDf(cataloageArr.cataloagePardoseli[index].pdf);
  }

  return (
    <div className={styles.container}>
      <div className={styles.catalogs}>
        <h2> Baie </h2>
        <hr />
        {
          cataloageArr.cataloageBaie.map((catalog, index) => (
            <CatalogCard index={index} image={catalog.image.childImageSharp.fixed} title={catalog.primary} subtitle="Baie"
              pdf={catalog.pdf} onClick={changePDF} />
          ))
        }
        <h2> Bucatarie </h2>
        <hr />
        {
          cataloageArr.cataloageBucatarie.map((catalog, index) => (
            <CatalogCard index={index} image={catalog.image.childImageSharp.fixed} title={catalog.primary} subtitle="Bucatarie"
              pdf={catalog.pdf} onClick={changePDF} />
          ))
        }
        <h2> Mobila </h2>
        <hr />
        {
          cataloageArr.cataloageMobila.map((catalog, index) => (
            <CatalogCard index={index} image={catalog.image.childImageSharp.fixed} title={catalog.primary} subtitle="Mobila"
              pdf={catalog.pdf} onClick={changePDF} />
          ))
        }
        <h2> Pardoseli, Gresie si Faianta </h2>
        <hr />
        {
          cataloageArr.cataloagePardoseli.map((catalog, index) => (
            <CatalogCard index={index} image={catalog.image.childImageSharp.fixed} title={catalog.primary} subtitle="Pardoseli, Gresie si Faianta"
              pdf={catalog.pdf} onClick={changePDF} />
          ))
        }
        <h2> Solutii tehnice </h2>
        <hr />
        {
          cataloageArr.cataloageTehnice.map((catalog, index) => (
            <CatalogCard index={index} image={catalog.image.childImageSharp.fixed} title={catalog.primary} subtitle="Solutii tehnice"
              pdf={catalog.pdf} onClick={changePDF} />
          ))
        }

      </div>
      <div className={styles.pdf__viewer}>
        <iframe src={currentPDF} className={styles.pdf} />
      </div>
    </div>
  )
}

export default CataloageOpen