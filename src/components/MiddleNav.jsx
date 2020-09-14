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
    width: 53%;
    transition: all 0.5s ease-in-out;
    ul {
        width: 100%;
        padding: 3% !important;
    }
    li {
      color: #fff;
      margin: 6% auto;
    }

    @media (max-width: 450px) {
      width: 65%;
      li {
        margin: 11% auto;
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