import React from 'react'
import styled from 'styled-components'
import { AutoColumnNav } from '../Column'
import Title from '../Title'
import { BasicLink } from '../Link'
//import { useMedia } from 'react-use'
//import { TYPE } from '../../Theme'
import { withRouter } from 'react-router-dom'
//import Link from '../Link'
//import { useSessionStart } from '../../contexts/Application'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import Toggle from '../Toggle'




const Option = styled.div`
  font-weight: 500;
  padding-left: 8px;
  padding-right: 8px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
  display: flex;
  :hover {
    opacity: 1;
  }
  @media (max-width: 900px) {
    font-size: 14px;
    padding-left: 4px;
    padding-right: 4px;
  }
`

const OptionLink = styled.div`
  font-weight: 500;
  padding-left: 8px;
  padding-right: 8px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
  display: flex;
  &:hover {
    color: ${({ theme }) => theme.link};
  }
  &.active {
    color: ${({ theme }) => theme.link};
  }
  @media (max-width: 900px) {
    font-size: 16px;
    padding-left: 4px;
    padding-right: 4px;
  }
`

const Link2 = styled.a`
  color: ${({ theme }) => theme.white};
  display: flex;
  &:hover {
    color: ${({ theme }) => theme.link};
  }
  &.active {
    color: ${({ theme }) => theme.link};
  }
`

const DesktopWrapper = styled.div`
  display: flex;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    z-index: 2;
`

const HeaderText = styled.div`
  margin-right: 0.75rem;
  font-size: 0.825rem;
  font-weight: 500;
  display: inline-box;
  display: -webkit-inline-box;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
  a {
    color: ${({ theme }) => theme.white};
  }
`

const FullCon = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  width: 100%;
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
`

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  font-size: 20px;
  line-height: 45px;
  font-weight: 700;
  @media (max-width: 900px) {
    font-size: 16px;
  }
`

function SideNav({ history }) {

  const [isDark, toggleDarkMode] = useDarkModeManager()

  return (
        <DesktopWrapper>
        <FullCon>
          <AutoColumnNav gap="1rem">
            <Title />
              <StyledNav gap="1.25rem">
                <OptionLink>
                  <Link2 href="https://cheeseswap.app/" target="_blank">
                    Exchange
                  </Link2>
                </OptionLink>
                <OptionLink>
                  <Link2 href="https://keep3rb.network/" target="_blank">
                    KP3RB
                  </Link2>
                </OptionLink>
                <OptionLink>
                  <Link2 href="https://stake.cheeseswap.app/" target="_blank">
                    Stake
                  </Link2>
                </OptionLink>
                <OptionLink>
                  <Link2 href="https://dice4cheese.com/" target="_blank">
                    Dice Alpha
                  </Link2>
                </OptionLink>
                <OptionLink>
                  <Link2 href="https://info.cheeseswap.app/" target="_blank">
                    Chart
                  </Link2>
                </OptionLink>
              </StyledNav>

          <Toggle isActive={isDark} toggle={toggleDarkMode} />
            <HeaderText>
            <BasicLink to="/home">
              <Option activeText={history.location.pathname === '/home' ?? undefined}>
                Overview
              </Option>
            </BasicLink>
            </HeaderText>
            <HeaderText>
            <BasicLink to="/tokens">
              <Option
                activeText={
                  (history.location.pathname.split('/')[1] === 'tokens' ||
                    history.location.pathname.split('/')[1] === 'token') ??
                  undefined
                }
              >
                Tokens
              </Option>
            </BasicLink>
            </HeaderText>
            <HeaderText>
            <BasicLink to="/pairs">
              <Option
                activeText={
                  (history.location.pathname.split('/')[1] === 'pairs' ||
                    history.location.pathname.split('/')[1] === 'pair') ??
                  undefined
                }
              >
                Pairs
              </Option>
            </BasicLink>
            </HeaderText>
            <HeaderText>
            <BasicLink to="/accounts">
              <Option
                activeText={
                  (history.location.pathname.split('/')[1] === 'accounts' ||
                    history.location.pathname.split('/')[1] === 'account') ??
                  undefined
                }
              >
                Accounts
              </Option>
            </BasicLink>
            </HeaderText>
          </AutoColumnNav>
        </FullCon>
        </DesktopWrapper>
  )
}

export default withRouter(SideNav)
