import React, { Component } from "react";
import Slider from "react-slick";
import image1 from "../images/transition/1.png"
import "./fadestyle.scss"
import "./header.scss"
import HomeNavigation from "../components/Home/HomeNavigation"

export default class Fade extends Component {
  render() {
    const settings = {
      arrows: false,
      dots: false,
      pauseOnHover: false,
      infinite: false,
      speed: 3000,
      autoplay: true,
      fade: true,
      variableWidth: false,
      slidesToShow: 15,
      slidesToScroll: 15,
    };

    return (
      <div>
        <Slider {...settings}>
          <div className="image__container">
            <img src={image1} height="100%" alt="slider-header" />
          </div>
        </Slider>

        <div className="header-content">
          <div className="header-filter" id="header-filter" />
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