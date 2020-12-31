
import React from 'react'
import styled from 'styled-components'
import { Sun, Moon } from 'react-feather'

const IconWrapper = styled.div<{ isActive?: boolean }>`
  opacity: ${({ isActive }) => (isActive ? 0.8 : 0.4)};
  :hover {
    opacity: 1;
  }
`

const StyledToggle = styled.div`
  display: flex;
  width: fit-content;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.white};
  :hover {
    text-decoration: none;
  }
`

export interface ToggleProps {
  isActive: boolean
  toggle: () => void
}

export default function Toggle({ isActive, toggle }: ToggleProps) {
  return (
    <StyledToggle onClick={toggle}>
      <span>
        <IconWrapper isActive={!isActive}>
          <Sun size={18} />
        </IconWrapper>
      </span>
      <span style={{ padding: '0 .5rem' }}></span>
      <span>
        <IconWrapper isActive={isActive}>
          <Moon size={18} />
        </IconWrapper>
      </span>
    </StyledToggle>
  )
}
