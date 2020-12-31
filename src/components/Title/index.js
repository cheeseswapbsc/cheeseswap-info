import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Flex } from 'rebass'
//import Link from '../Link'
import { RowFixed } from '../Row'
import Logo from '../../assets/logo.svg'

const TitleWrapper = styled.div`
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  z-index: 10;
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  margin-right: 10px;
  margin-top: 10px;
  img {
    height: 48px;
  }

`

const Title2 = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  text-decoration: none;
  font-size: 36px;
  font-family: 'Teko', sans-serif;
  font-weight: 900;
  color: ${({ theme }) => theme.titlecolor};
  letter-spacing: 0.03em;
  margin-left: 8px;
  :hover {
    transform: rotate(-5deg);
  }
`

export default function Title() {
  const history = useHistory()

  return (
    <TitleWrapper onClick={() => history.push('/')}>
      <Flex alignItems="center">
        <RowFixed>
        <Title2 id="link" onClick={() => history.push('/')}>
          <UniIcon>
            <img src={Logo} alt="logo" />
          </UniIcon>
          CheeseSwap.App
        </Title2>
        </RowFixed>
      </Flex>
    </TitleWrapper>
  )
}
