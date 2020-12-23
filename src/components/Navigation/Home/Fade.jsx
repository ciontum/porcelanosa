import React from "react";
import Slider from "react-slick";
import "./fadestyle.scss"
import "../../Header/header.scss"
import HomeNavigation from "../../Home/HomeNavigation"
import Image from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

const query = graphql`
{
  homeHeaders: allFile(filter: {relativeDirectory: {eq:"transition"}}) {
    edges {
      node {
        childImageSharp {
          fluid(quality: 100, jpegQuality: 100, pngQuality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}`

const Fade = () => {
  const settings = {
    arrows: false,
    dots: false,
    pauseOnHover: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 3000,
    fade: true,
    variableWidth: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let { homeHeaders } = useStaticQuery(query)

  return (
    <div>
      <Slider {...settings}>
        {
          homeHeaders.edges.map((edge, index) => (
            <div className="image__container">
              <Image key={index} fluid={edge.node.childImageSharp.fluid} alt="slider-header-image" />
            </div>
          ))
        }

      </Slider>

      <div className="header-content">
        <div className="header-filter" id="header-filter" />
        <HomeNavigation />
        <div className="header-bottom">
          <p>DESIGN.</p>
          <p>LUX.</p>
          <p>INOVAȚIE.</p>
        </div>
      </div>
    </div>
  );
}

export default Fade;