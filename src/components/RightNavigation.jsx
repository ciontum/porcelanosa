import React from "react"
import NavigationLinks from "./NavigationLinks"
import "./navigation-links.scss"
import styled from 'styled-components'

const UlNav = styled.ul`
  width: 85%;
  height: 100px;
  padding: 3% 0%;
  
  @media (max-width: 950px) {
    flex-flow: column nowrap;
    background: #343434d9;
    position: absolute;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.5s ease-in-out;

    top: 100%;
    right: 0;
    
    height: auto;
    width: 100%;

    li {
      color: #fff;
    }

    .products-menu {
      position: absolute;
      width: 100%;
      z-index: 1000;
      height: 300px;
      margin: 0 auto;

      .products-menu_first {
        width: 35%;
        li {
          font-size: 15px;
          color: black !important; 
        }
      }

      .products-menu_second {
        width: 30%;
        ul > a {
          font-size: 15px;
        }
      }

      .products-menu_image {
        position: relative;
        min-width: 50%;
        width: 70%;
        background-color: black;
      }
    }

    .products-menu_active::after {
      margin-left: 10%;
      margin-right: 0px !important;
    }

    .products-menu_second ul a:hover::after{
      margin-left: 5%;
      margin-right: 0px !important;
    }
  }

  @media (max-width: 750px) {
    li {
      padding: 0% auto;
    }
    
    .products-menu {
      top: 34%;
      align-items: center;
      overflow-y: auto;

      .products-menu_first{
        width: 60%;
      }

      .products-menu_second{
        width: 60%;
      }

      .products-menu_active:after {
        margin-left: 3%
      }

      .products-menu_second:focus {
        display:none;
      }

      .products-menu_first ul {
        margin: 5% 0%;
        text-align: center;
        font-size: calc(13px + 12 * ((100vw - 300px) / (1600 - 300)));

        li {
          justify-content: center;
        }
      }

      .products-menu_second ul{
        margin: 5% 0% 10%;
        font-size: calc(11px + 12 * ((100vw - 300px) / (1600 - 300)));
        
        a {
          justify-content: center;
        }
      }
    }
  }

  @media (max-width: 450px) {
    width: 100%;
  }

  @media (max-width: 300px) {
    .products-menu {
      top: 30%;

    .products-menu_first{
        width: 100%;

        li{
          margin: 3% auto;
        }
        
      }

    .products-menu_second{
        width: 100%;
      }
    }
  }
`;

const RightNavigation = ({ open, classNameLinks }) => {
  return (
    <UlNav open={open}>
      <NavigationLinks classNameLinks={classNameLinks} />
    </UlNav>
  )
}

export default RightNavigation