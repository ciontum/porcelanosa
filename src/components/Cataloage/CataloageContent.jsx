import React from 'react'
import "./cataloage-content.scss"
import CataloageCategory from './CataloageCategory'
import { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

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
const CataloageContent = React.forwardRef(({ }, ref) => {

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

  return (
    <div ref={ref} className="cataloage-content">
      <CataloageCategory cataloage={cataloageArr.cataloageBaie} name="Baie" id="baie" />
      <CataloageCategory cataloage={cataloageArr.cataloageBucatarie} name="Bucatarie" id="bucătărie" />
      <CataloageCategory cataloage={cataloageArr.cataloageMobila} name="Mobila" id="mobila" />
      <CataloageCategory cataloage={cataloageArr.cataloagePardoseli} name="Pardoseli, Gresie si Faianta" id="gresie-și-faianță" />
      <CataloageCategory cataloage={cataloageArr.cataloageTehnice} name="Solutii tehnice" id="solutii-tehnice" />
    </div>
  )
}
)


export default CataloageContent