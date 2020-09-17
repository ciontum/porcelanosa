import React from "react"
import NavigationLinks from "./NavigationLinks"
import "./navigation-links.scss"
import styled from 'styled-components'

const Ul = styled.div`
  width: 100%;
  @media (max-width: 750px) {
    flex-flow: column nowrap;
    background: #343434d9;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(450%)'};
    height: auto;
    width: 70%;
    transition: all 0.5s ease-in-out;

    li {
      color: #fff;
      margin: 5% auto;
    }

    .products-menu {
      position: absolute;
      z-index: 1000;
      top: 33%;
      height: 300px;
      width: 100%;

      .products-menu_first{
        width: 100%;

        ul {
          margin: 3% auto;
        }

        li {
          margin: 3% auto !important;
          color: black;
          justify-content: center;
          text-align:center;
        }
      }

      .products-menu_second{
        width: 100%;

        a {
          justify-content: center;
         }

        ul{
          margin: 5% 0%; 
          font-size: calc(11px + 12 * ((100vw - 300px) / (1600 - 300)));
        }
      }

      .products-menu_active::after {
        margin-left: 5%;
        margin-right: 0px !important;
      }

      .products-menu_second ul a:hover::after{
        margin-left: 5%;
        margin-right: 0px !important;
      }

      .products-menu_image {
        display:none;
      }

    }
  }

  @media (max-width: 450px) {
    width: 100%;
    li {
      margin: 7% auto;
    }
  }

  @media (max-width: 300px) {
    .navigation-links-home{
      width: 100%;

    }
    .products-menu {
      width: 100%;
      top: 30%;

    .products-menu_first{
        width: 100%;

        li{
          margin: auto
        }

        .products-menu_active:after {
          margin-left: 3%
        }
        
      }

    .products-menu_second{
        width: 100%;
      }
    }
  }
`;

const MiddleNav = ({ open, classNameLinks}) => {
    return (
        <Ul open={open}>
            <NavigationLinks classNameLinks={classNameLinks} />
        </Ul>
    )
}

export default MiddleNav