import React, { Component } from "react";
import Slider from "react-slick";
import image1 from "../images/transition/1.png"
import image2 from "../images/transition/2.png"
import "./fadestyle.scss"
import "./header.scss"
import HomeNavigation from "../components/Home/HomeNavigation"
import styled from 'styled-components'

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

    const array = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
    const images = array.map(image => {
      return (
        <div className="image__container">
          <img key={image} src={require(`../images/transition/${image}.png`)} height="100%" />
        </div>
      )
    });


    return (
      <div>
        <Slider {...settings}>
          {/* {images} */}
          <div className="image__container">
            <img src={image1} height="100%" />

          </div>
          {/* <div className="image__container">
            <img src={image2} height="100%" />
          </div>  */} 
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