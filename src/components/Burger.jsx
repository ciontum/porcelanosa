import React from "react"
import { useState } from "react"
import styled from 'styled-components'
import MiddleNav from "./MiddleNav"

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: static;
  z-index: 20;
  display: none;

  @media (max-width: 750px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    margin-top: 3%;
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

const Burger = ({classNameLinks}) => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <MiddleNav open={open} classNameLinks={classNameLinks}/>
    </>
  )
}
export default Burger