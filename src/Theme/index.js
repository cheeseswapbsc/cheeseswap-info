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

  panelColor: darkMode ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0)',
  backgroundColor: darkMode ? '#191326' : '#f5f3f3',

  // uniswapPink: darkMode ? '#D455B5' : 'black',
  uniswapPink: darkMode ? 'red' : 'black',

  concreteGray: darkMode ? '#292C2F' : '#ffecf9',
  inputBackground: darkMode ? '#1F1F1F' : '#ffecf9',
  shadowColor: darkMode ? '#120910' : '#b4459a',
  mercuryGray: darkMode ? '#333333' : '#E1E1E1',

  text1: darkMode ? '#ffecf9' : '#1F1F1F',
  text2: darkMode ? '#C3C5CB' : '#72556b',
  text3: darkMode ? '#6C7284' : '#888D9B',
  text4: darkMode ? '#72556b' : '#C3C5CB',
  text5: darkMode ? '#342331' : '#ffdff5',

  // special case text types
  white: '#FFFFFF',

  // backgrounds / greys
  bg1: darkMode ? '#1c111a' : '#ffecf9',
  bg2: darkMode ? '#342331' : '#ffd4ee',
  bg3: darkMode ? '#362231' : '#ffdff5',
  bg4: darkMode ? '#72556b' : '#ffbbe7',
  bg5: darkMode ? '#72556b' : '#888D9B',
  bg6: darkMode ? '#120910' : '#FFFFFF',

  //specialty colors
  modalBG: darkMode ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.6)',
  advancedBG: darkMode ? '#1c111a' : '#fffcfe',
  onlyLight: darkMode ? '#170D15' : '#fff5fc',
  divider: darkMode ? 'rgba(54, 34, 49 , 0.435)' : 'rgba(255, 223, 245 , 0.75)',

  //primary colors
  primary1: darkMode ? '#2172E5' : '#D455B5',
  primary2: darkMode ? '#3680E7' : '#FF8CC3',
  primary3: darkMode ? '#4D8FEA' : '#FF99C9',
  primary4: darkMode ? '#376bad70' : '#F6DDE8',
  primary5: darkMode ? '#153d6f70' : '#FDEAF1',

  // color text
  primaryText1: darkMode ? '#6da8ff' : '#D455B5',

  // secondary colors
  secondary1: darkMode ? '#2172E5' : '#D455B5',
  secondary2: darkMode ? '#17000b26' : '#F6DDE8',
  secondary3: darkMode ? '#17000b26' : '#FDEAF1',

  shadow1: darkMode ? '#120910' : '#b4459a',

  // other
  red1: '#FF6871',
  green1: '#27AE60',
  yellow1: '#FFE270',
  yellow2: '#F3841E',
  link: '#b5449b',
  blue: '#b4459a',

  background: darkMode ? 'black' : `radial-gradient(50% 50% at 50% 50%, #D455B5 30 0%, #fff 0%)`
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
  @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700;800&display=swap');
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
