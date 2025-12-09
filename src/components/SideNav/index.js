import React from 'react'
import styled from 'styled-components'
import { AutoColumn, AutoColumnImg } from '../Column'
import Title from '../Title'
import { BasicLink } from '../Link'
import { useMedia } from 'react-use'
import { TYPE } from '../../Theme'
import { withRouter } from 'react-router-dom'
import { TrendingUp, List, PieChart, Disc, RefreshCw, Home, Send, Twitter, BookOpen, GitMerge, Bell } from 'react-feather'
import Link from '../Link'
import { useSessionStart } from '../../contexts/Application'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import Toggle from '../Toggle'

const Wrapper = styled.div`
  height: ${({ isMobile }) => (isMobile ? 'initial' : '100vh')};
  /* Use theme tokens for background so sidebar follows theme */
  background: ${({ theme }) => theme.bg6};
  color: ${({ theme }) => theme.text1};
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  position: sticky;
  top: 0px;
  z-index: 9999;
  box-sizing: border-box;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    position: relative;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
`

const Option = styled.div`
  font-weight: 700;
  font-size: 14px;
  opacity: ${({ activeText }) => (activeText ? 1 : 0.6)};
  color: ${({ theme }) => theme.text1};
  display: flex;
  :hover {
    opacity: 1;
  }
`

const DesktopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`

const MobileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderText = styled.div`
  font-size: 0.825rem;
  font-weight: 700;
  display: inline-box;
  display: -webkit-inline-box;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
  a {
    color: ${({ theme }) => theme.text1};
  }
`

const Polling = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  bottom: 0;
  padding: 1rem;
  color: ${({ theme }) => theme.text3};
  opacity: 0.4;
  transition: opacity 0.25s ease;
  :hover {
    opacity: 1;
  }
`
const PollingDot = styled.div`
  width: 8px;
  height: 8px;
  min-height: 8px;
  min-width: 8px;
  margin-right: 0.5rem;
  margin-top: 3px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.green1};
`

function SideNav({ history }) {
  const below1080 = useMedia('(max-width: 1080px)')

  const below1180 = useMedia('(max-width: 1180px)')

  const seconds = useSessionStart()

  const [isDark, toggleDarkMode] = useDarkModeManager()

  return (
    <Wrapper isMobile={below1080}>
      {!below1080 ? (
        <DesktopWrapper>
          <AutoColumn gap="1rem" style={{ marginLeft: '.75rem', marginTop: '1.5rem' }}>
            <Title />
            {!below1080 && (
              <AutoColumn gap="0.75rem" style={{ marginTop: '0.5rem' }}>
                <BasicLink to="/home">
                  <Option activeText={history.location.pathname === '/home' ?? undefined}>
                    <TrendingUp size={20} style={{ marginRight: '.75rem' }} />
                    Overview
                  </Option>
                </BasicLink>
                <BasicLink to="/tokens">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'tokens' ||
                        history.location.pathname.split('/')[1] === 'token') ??
                      undefined
                    }
                  >
                    <Disc size={20} style={{ marginRight: '.75rem' }} />
                    Tokens
                  </Option>
                </BasicLink>
                <BasicLink to="/pairs">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'pairs' ||
                        history.location.pathname.split('/')[1] === 'pair') ??
                      undefined
                    }
                  >
                    <PieChart size={20} style={{ marginRight: '.75rem' }} />
                    Pairs
                  </Option>
                </BasicLink>

                <BasicLink to="/accounts">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'accounts' ||
                        history.location.pathname.split('/')[1] === 'account') ??
                      undefined
                    }
                  >
                    <List size={20} style={{ marginRight: '.75rem' }} />
                    Accounts
                  </Option>
                </BasicLink>
                <Link href="https://cheeseswap.app" target="_blank">
                  <Option>
                    <RefreshCw size={20} style={{ marginRight: '.75rem' }} />
                      Exchange<br />
                  </Option>
                </Link>
                <Link href="#" target="_blank">
                  <Option>
                    <List size={20} style={{ marginRight: '.75rem' }} />
                      Farms - Earn
                  </Option>
                </Link>
                <Link href="https://hots.cheeseswap.app" target="_blank">
                  <Option>
                    <Bell size={20} style={{ marginRight: '.75rem' }} />
                      HOTS Farm
                  </Option>
                </Link>
                <Link href="https://pizza.cheeseswap.app" target="_blank">
                  <Option>
                    <Bell size={20} style={{ marginRight: '.75rem' }} />
                      PIZZA Farm<br />
                  </Option>
                </Link>
                   <Link href="https://kiwi.cheeseswap.app" target="_blank">
                  <Option>
                    <Bell size={20} style={{ marginRight: '.75rem' }} />
                      KIWI Farm<br />
                  </Option>
                </Link>
                 <Link href="https://mango.cheeseswap.app" target="_blank">
                  <Option>
                    <Bell size={20} style={{ marginRight: '.75rem' }} />
                      MANGO Farm<br />
                  </Option>
                </Link>
                <Link href="https://cnft.cheeseswap.app" target="_blank">
                  <Option>
                    <Bell size={20} style={{ marginRight: '.75rem' }} />
                     CNFT Farm<br />
                  </Option>
                </Link>
              </AutoColumn>
            )}
          </AutoColumn>
          <AutoColumnImg gap="0.5rem" style={{ marginLeft: '.75rem', marginBottom: '4rem', marginTop: '2rem' }}>
            <HeaderText>
              <Link href="https://cheeseswap.app/" target="_blank">
                <Home size={18} style={{ marginRight: '.75rem' }} />
              </Link>
            </HeaderText>
            <HeaderText>
              <Link href="#" target="_blank">
                <Send size={18} style={{ marginRight: '.75rem' }} />
              </Link>
            </HeaderText>
            <HeaderText>
              <Link href="https://twitter.com/cheeseswapbsc" target="_blank">
                <Twitter size={18} style={{ marginRight: '.75rem' }} />
              </Link>
            </HeaderText>
            <HeaderText>
              <Link href="https://help.cheeseswap.app/" target="_blank">
                <BookOpen size={18} style={{ marginRight: '.75rem' }} />
              </Link>
            </HeaderText>
            <HeaderText>
              <Link href="https://github.com/cheeseswapbsc" target="_blank">
                <GitMerge size={18} style={{ marginRight: '.75rem' }} />
              </Link>
            </HeaderText>
            <Toggle isActive={isDark} toggle={toggleDarkMode} />
          </AutoColumnImg>
            {!below1180 && (
            <Polling style={{ marginLeft: '.5rem' }}>
              <PollingDot />
              <a href="/" style={{ color: 'inherit' }}>
                <TYPE.small color={'text3'}>
                  Updated {!!seconds ? seconds + 's' : '-'} ago <br />
                </TYPE.small>
              </a>
            </Polling>
          )}
        </DesktopWrapper>
      ) : (
        <MobileWrapper>
          <Title />
        </MobileWrapper>
      )}
    </Wrapper>
  )
}

export default withRouter(SideNav)
