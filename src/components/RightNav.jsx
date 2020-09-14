import React from "react"
import NavigationLinks from "./NavigationLinks"
import "./navigation-links.scss"
import styled from 'styled-components'

const Ul = styled.ul`
  width: 100%;
  @media (max-width: 750px) {
    flex-flow: column nowrap;
    background:#343434d9;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(450%)'};
    height: 40%;
    width: 50%;
    transition: all 0.5s ease-in-out;
    ul {
        width: 50%;
        padding: 3% !important;
    }
    li {
      color: #fff;
      margin: 2% auto;
    }
  }
`;

const RightNav = ({ open, classNameLinks}) => {
    return (
        <Ul open={open}>
            <NavigationLinks classNameLinks={classNameLinks} />
        </Ul>
    )
}

export default RightNav