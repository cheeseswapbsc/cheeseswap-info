import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components'
import { useDarkModeManager } from '../contexts/LocalStorage'
import styled from 'styled-components'
import { Text } from 'rebass'
import getTheme from './theme'

export default function ThemeProvider({ children }) {
  const [darkMode] = useDarkModeManager()

  return <StyledComponentsThemeProvider theme={getTheme(darkMode)}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => theme[color]};
`

export const TYPE = {
  main(props) {
    return <TextWrapper fontWeight={700} fontSize={14} color={'text1'} {...props} />
  },

  body(props) {
    return <TextWrapper fontWeight={600} fontSize={14} color={'text1'} {...props} />
  },

  small(props) {
    return <TextWrapper fontWeight={700} fontSize={12} color={'text1'} {...props} />
  },

  header(props) {
    return <TextWrapper fontWeight={700} color={'text1'} {...props} />
  },

  largeHeader(props) {
    return <TextWrapper fontWeight={700} color={'text1'} fontSize={20} {...props} />
  },

  light(props) {
    return <TextWrapper fontWeight={600} color={'text3'} fontSize={14} {...props} />
  },

  pink(props) {
    return <TextWrapper fontWeight={props.faded ? 600 : 700} color={props.faded ? 'text1' : 'text1'} {...props} />
  }
}

export const Hover = styled.div`
  :hover {
    cursor: pointer;
  }
`

export const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 700;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: none;
    text-decoration: underline;
  }
  :active {
    text-decoration: none;
  }
`

export const ThemedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  max-width: 100vw !important;
  height: 200vh;
  mix-blend-mode: color;
  background: ${({ backgroundColor }) =>
    `radial-gradient(50% 50% at 50% 50%, ${backgroundColor} 0%, rgba(255, 255, 255, 0) 100%)`};
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9999;

  transform: translateY(-110vh);
`

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&display=swap');
  html { font-family: 'Noto Sans', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Noto Sans', sans-serif; }
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
    font-weight: 600;
    background-color: ${({ theme }) => theme.bg6};
  }

  a {
    text-decoration: none;

    :hover {
      text-decoration: none
    }
  }


.three-line-legend {
	width: 100%;
	height: 70px;
	position: absolute;
	padding: 8px;
	font-size: 16px;
	color: #20262E;
	background-color: rgba(255, 255, 255, 0.23);
	text-align: left;
	z-index: 10;
  pointer-events: none;
}

.three-line-legend-dark {
	width: 100%;
	height: 70px;
	position: absolute;
	padding: 8px;
	font-size: 16px;
	color: white;
	background-color: rgba(255, 255, 255, 0.23);
	text-align: left;
	z-index: 10;
  pointer-events: none;
}

@media screen and (max-width: 800px) {
  .three-line-legend {
    display: none !important;
  }
}

.tv-lightweight-charts{
  width: 100% !important;


  & > * {
    width: 100% !important;
  }
}


  html {
    font-size: 1rem;
    font-variant: none;
    color: 'black';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    height: 100%;
  }
`
