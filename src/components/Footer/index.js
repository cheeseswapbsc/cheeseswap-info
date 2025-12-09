import React from 'react'
import { Flex } from 'rebass'

import Link from '../Link'

const links = [
  { url: 'https://cheeseswap.app', text: 'Swap' },
  { url: 'https://help.cheeseswap.app/', text: 'Help' },
  { url: 'https://github.com/cheeseswapbsc/cheeseswap-info', text: 'Github' }
]

const FooterLink = ({ children, ...rest }) => (
  <Link external color="uniswappink" fontWeight={700} fontSize={16} mr={'8px'} {...rest}>
    {children}
  </Link>
)

const Footer = () => (
  <Flex as="footer" p={24}>
    {links.map((link, index) => (
      <FooterLink key={index} href={link.url}>
        {link.text}
      </FooterLink>
    ))}
  </Flex>
)

export default Footer
