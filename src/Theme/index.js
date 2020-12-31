import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components'
import { useDarkModeManager } from '../contexts/LocalStorage'
import styled from 'styled-components'
import { Text } from 'rebass'

export default function ThemeProvider({ children }) {
  const [darkMode] = useDarkModeManager()

  return <StyledComponentsThemeProvider theme={theme(darkMode)}>{children}</StyledComponentsThemeProvider>
}

const theme = (darkMode, color) => ({
  customColor: color,
  textColor: darkMode ? color : 'black',
  panelbgColor: darkMode ? '#160D1A' : '#FFF5FC',

  panelColor: darkMode ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0)',
  backgroundColor: darkMode ? '#191326' : '#f5f3f3',

  // uniswapPink: darkMode ? '#B5449B' : 'black',
  uniswapPink: darkMode ? 'red' : 'black',

  concreteGray: darkMode ? '#292C2F' : '#fffdfa',
  inputBackground: darkMode ? '#1F1F1F' : '#fffdfa',
  shadowColor: darkMode ? '#000' : '#2F80ED',
  mercuryGray: darkMode ? '#333333' : '#E1E1E1',

  text1: darkMode ? '#fffdfa' : '#1F1F1F',
  text2: darkMode ? '#C3C5CB' : '#565A69',
  text3: darkMode ? '#6C7284' : '#888D9B',
  text4: darkMode ? '#565A69' : '#C3C5CB',
  text5: darkMode ? '#2C2F36' : '#FFDFF5',

  // special case text types
  white: darkMode ? '#fff' : '#000',
  titlecolor: darkMode ? '#FFC700' : '#000',
  // backgrounds / greys
  bg1: darkMode ? '#090A0A' : '#F2F1E8',
  bg2: darkMode ? '#2C2F36' : '#FFEAF8',
  bg3: darkMode ? '#261823' : '#FFDFF5',
  bg4: darkMode ? '#565A69' : '#FFD6F2',
  bg5: darkMode ? '#565A69' : '#888D9B',
  bg6: darkMode ? '#000' : '#FFF',
  bg7: darkMode ? 'rgba(13, 9, 16, 0.95)' : 'rgba(255, 255, 255,0.95)',

  //specialty colors
  modalBG: darkMode ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.6)',
  advancedBG: darkMode ? '#1C161F' : '#FFFCFE',
  onlyLight: darkMode ? '#22242a' : 'transparent',
  divider: darkMode ? 'rgba(43, 43, 43, 0.435)' : 'rgba(43, 43, 43, 0.035)',

  //primary colors
  primary1: darkMode ? '#2172E5' : '#B5449B',
  primary2: darkMode ? '#3680E7' : '#FF8CC3',
  primary3: darkMode ? '#4D8FEA' : '#FF99C9',
  primary4: darkMode ? '#376bad70' : '#F6DDE8',
  primary5: darkMode ? '#153d6f70' : '#FDEAF1',

  // color text
  primaryText1: darkMode ? '#6da8ff' : '#B5449B',

  // secondary colors
  secondary1: darkMode ? '#2172E5' : '#B5449B',
  secondary2: darkMode ? '#17000b26' : '#F6DDE8',
  secondary3: darkMode ? '#17000b26' : '#FDEAF1',

  shadow1: darkMode ? '#000' : '#2F80ED',

  // other
  red1: '#FF6871',
  green1: '#27AE60',
  yellow1: '#FFE270',
  yellow2: '#F3841E',
  link: darkMode ? '#B5449B' : '#2172E5',
  blue: darkMode ? '#B5449B' : '#2172E5',

  background: darkMode ? 'black' : `radial-gradient(50% 50% at 50% 50%, #B5449B 30 0%, #fff 0%)`
})

const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => theme[color]};
`

export const TYPE = {
  main(props) {
    return <TextWrapper fontWeight={700} fontSize={18} color={'text1'} {...props} />
  },

  body(props) {
    return <TextWrapper fontWeight={600} fontSize={18} color={'text1'} {...props} />
  },

  small(props) {
    return <TextWrapper fontWeight={700} fontSize={14} color={'text1'} {...props} />
  },

  header(props) {
    return <TextWrapper fontWeight={700} color={'text1'} {...props} />
  },

  largeHeader(props) {
    return <TextWrapper fontWeight={700} color={'text1'} fontSize={24} {...props} />
  },

  light(props) {
    return <TextWrapper fontWeight={600} color={'text3'} fontSize={18} {...props} />
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
  font-weight: 500;
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
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9999;

  transform: translateY(-110vh);
`

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Teko:400,500,600,700,800,900');
  html { font-family: 'Teko', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Teko', sans-serif; }
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 18px;
    background: ${({ theme }) => theme.panelbgColor};
    overflow-x: hidden;
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
	font-size: 12px;
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
	font-size: 12px;
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
