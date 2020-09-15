import React, { Component } from "react";
import Slider from "react-slick";
import image1 from "../images/hero/image1.png"
import image2 from "../images/hero/image2.png"
import "./fadestyle.scss"
import "./header.scss"
import HomeNavigation from "../components/Home/HomeNavigation"

export default class Fade extends Component {
  render() {
    const settings = {
      arrows: false,
      dots: false,
      pauseOnHover: false,
      infinite: true,
      speed: 3000,
      autoplay: true,
      fade: true,
      variableWidth: false,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    return (
      <div>
        
          <Slider {...settings}>
            <div className="image__container image_1">
              <img src={image1} height="100%" />
            </div>
            <div className="image__container">
              <img src={image2}  height="100%" />
            </div>
          </Slider>
          <div className="header-content">
          <div className="header-filter" id="header-filter"></div>
          <HomeNavigation classNameLinks="navigation-links-home" />
          <div className="header-bottom">
            <p>DESIGN.</p>
            <p>LUX.</p>
            <p>INOVAȚIE.</p>
          </div>
        </div>
      </div>
    );
  }
}