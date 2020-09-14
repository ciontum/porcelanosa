import React from "react"
import NavigationLinks from "./NavigationLinks"
import "./navigation-links.scss"
import styled from 'styled-components'

const UlNav = styled.ul`
  width: 90%;
  height:100px;
  padding: 3% 0%;
  @media (max-width: 950px) {
    flex-flow: column nowrap;
    background:#343434d9;
    position: absolute;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 100%;
    right: 0;
    height: auto;
    width: 35%;
    transition: all 0.5s ease-in-out;
    li {
      color: #fff;
      margin: 5% auto;
    }
  }

  @media (max-width: 450px) {
    width: 56%;
  }
`;

const RightNavigation = ({ open, classNameLinks}) => {
    return (
        <UlNav open={open}>
            <NavigationLinks classNameLinks={classNameLinks} />
        </UlNav>
    )
}

export default RightNavigation