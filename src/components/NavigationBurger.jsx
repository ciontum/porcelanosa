import React from "react"
import { useState } from "react"
import RightNavigation from "./RightNavigation"
import styled from 'styled-components'

const StyledNavBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: absolute;
  z-index: 20;
  display: none;
  right: 3%;

  @media (max-width: 950px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: #ccc;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      opacity: ${({ open }) => open ? 0 : 1};
    }
    
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const NavigationBurger = ({ classNameLinks }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <StyledNavBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledNavBurger>
      <RightNavigation open={open} classNameLinks={classNameLinks} />
    </>
  )
}
export default NavigationBurger