import React, { useContext, useState, useEffect } from "react"
import RightNavigation from "./RightNavigation"
import styled from 'styled-components'
import { IsMenuOpenedContext, DismissMenuContext } from "../utils/context"

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
  const { _, setProductsMenuOpen } = useContext(IsMenuOpenedContext)
  const { showSecondNav } = useContext(DismissMenuContext)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!showSecondNav) {
      setOpen(false)
      setProductsMenuOpen(false)
    }
  }, [showSecondNav])

  return (
    <>
      <StyledNavBurger open={open && showSecondNav} onClick={() => { setOpen(!open); setProductsMenuOpen(false) }}>
        <div />
        <div />
        <div />
      </StyledNavBurger>
      <RightNavigation open={open && showSecondNav} classNameLinks={classNameLinks} />
    </>
  )
}
export default NavigationBurger