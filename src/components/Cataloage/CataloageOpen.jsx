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
    console.log(window.location.href)
    const path = window.location.href
    const pdfParts = path.split('#')[1].split('_')

    if (pdfParts[0] === "baie") {
      for (let i = 0; i < cataloageArr.cataloageBaie.length; i++) {
        if (cataloageArr.cataloageBaie[i].primary.replace(/[\s]/g, '-').toLowerCase() === pdfParts[1])
          return cataloageArr.cataloageBaie[i].pdf
      }
    } else if (pdfParts[0] === "bucatarie") {
      for (let i = 0; i < cataloageArr.cataloageBucatarie.length; i++) {
        if (cataloageArr.cataloageBucatarie[i].primary.replace(/[\s]/g, '-').toLowerCase() === pdfParts[1])
          return cataloageArr.cataloageBucatarie[i].pdf
      }
    } else if (pdfParts[0] === "mobila") {
      for (let i = 0; i < cataloageArr.cataloageMobila.length; i++) {
        if (cataloageArr.cataloageMobila[i].primary.replace(/[\s]/g, '-').toLowerCase() === pdfParts[1])
          return cataloageArr.cataloageMobila[i].pdf
      }
    } else if (pdfParts[0] === "solutii-tehnice") {
      for (let i = 0; i < cataloageArr.cataloageTehnice.length; i++) {
        if (cataloageArr.cataloageTehnice[i].primary.replace(/[\s]/g, '-').toLowerCase() === pdfParts[1])
          return cataloageArr.cataloageTehnice[i].pdf
      }
    } else {
      for (let i = 0; i < cataloageArr.cataloagePardoseli.length; i++) {
        if (cataloageArr.cataloagePardoseli[i].primary.replace(/[\s]/g, '-').toLowerCase() === pdfParts[1])
          return cataloageArr.cataloagePardoseli[i].pdf
      }
    }
  })

  function changePDF(subtitle, index) {
    if (subtitle === "Baie") {
      setCurrentPDf(cataloageArr.cataloageBaie[index].pdf);
      window.location.hash = 'baie_' + cataloageArr.cataloageBaie[index].primary.replace(/[\s]/g, '-').toLowerCase()
    } else if (subtitle === "Bucatarie") {
      setCurrentPDf(cataloageArr.cataloageBucatarie[index].pdf);
      window.location.hash = 'bucatarie_' + cataloageArr.cataloageBucatarie[index].primary.replace(/[\s]/g, '-').toLowerCase()
    } else if (subtitle === "Mobila") {
      setCurrentPDf(cataloageArr.cataloageMobila[index].pdf);
      window.location.hash = 'mobila_' + cataloageArr.cataloageMobila[index].primary.replace(/[\s]/g, '-').toLowerCase()
    } else if (subtitle === "Solutii tehnice") {
      setCurrentPDf(cataloageArr.cataloageTehnice[index].pdf);
      window.location.hash = 'solutii-tehnice_' + cataloageArr.cataloageTehnice[index].primary.replace(/[\s]/g, '-').toLowerCase()
    } else {
      setCurrentPDf(cataloageArr.cataloagePardoseli[index].pdf);
      window.location.hash = 'pardoseli_' + cataloageArr.cataloagePardoseli[index].primary.replace(/[\s]/g, '-').toLowerCase()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.catalogs}>
        <div className={styles.section}>
          <div className={styles.section_title}>
            <h2> Baie </h2>
          </div>
          <hr />
          {
            cataloageArr.cataloageBaie.map((catalog, index) => (
              <CatalogCard index={index} image={catalog.image.childImageSharp.fixed} title={catalog.primary} subtitle="Baie"
                pdf={catalog.pdf} onClick={changePDF} />
            ))
          }
        </div>
        <div className={styles.section}>
          <div className={styles.section_title}>
            <h2> Bucătărie </h2>
          </div>
          <hr />
          {
            cataloageArr.cataloageBucatarie.map((catalog, index) => (
              <CatalogCard index={index} image={catalog.image.childImageSharp.fixed} title={catalog.primary} subtitle="Bucatarie"
                pdf={catalog.pdf} onClick={changePDF} />
            ))
          }
        </div>
        <div className={styles.section}>
          <div className={styles.section_title}>
            <h2> Mobilă </h2>
          </div>
          <hr />
          {
            cataloageArr.cataloageMobila.map((catalog, index) => (
              <CatalogCard index={index} image={catalog.image.childImageSharp.fixed} title={catalog.primary} subtitle="Mobila"
                pdf={catalog.pdf} onClick={changePDF} />
            ))
          }
        </div>
        <div className={styles.section}>
          <div className={styles.section_title}>
            <h2> Pardoseli, Gresie și Faianță </h2>
          </div>
          <hr />
          {
            cataloageArr.cataloagePardoseli.map((catalog, index) => (
              <CatalogCard index={index} image={catalog.image.childImageSharp.fixed} title={catalog.primary} subtitle="Pardoseli, Gresie si Faianta"
                pdf={catalog.pdf} onClick={changePDF} />
            ))
          }
        </div>
        <div className={styles.section}>
          <div className={styles.section_title}>
            <h2> Soluții tehnice </h2>
          </div>
          <hr />
          {
            cataloageArr.cataloageTehnice.map((catalog, index) => (
              <CatalogCard index={index} image={catalog.image.childImageSharp.fixed} title={catalog.primary} subtitle="Solutii tehnice"
                pdf={catalog.pdf} onClick={changePDF} />
            ))
          }
        </div>
      </div>
      <div className={styles.pdf__viewer}>
        <iframe title="pdf-viewer" src={currentPDF} className={styles.pdf} />
      </div>
    </div>
  )
}

export default CataloageOpen