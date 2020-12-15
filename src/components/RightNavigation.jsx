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
    .products-menu {
      height: 220px;

      .products-menu_first {
        width: 35%;
        li {
          font-size: 12px;
          color: black !important; 
        }
      }

      .products-menu_second {
        width: 30%;
        ul > a {
          font-size: 12px;
        }
      }
    }
  }

  @media (max-width: 650px) {
    .products-menu {
      .products-menu_first {
        min-width: 50%;
        width: 100%;

        ul {
          margin: 10px;
        }

        li {
          font-size: 12px;
          color: black !important; 
        }
      }

      .products-menu_second {
        width: 100%;
        ul > a {
          font-size: 12px;
        }
      }

      .products-menu_image {
        display: none;
      }
    }
  }

  @media (max-width: 450px) {
    width: 100%;
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