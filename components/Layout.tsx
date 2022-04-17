import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
  className?: string
}

const Layout = ({ children, title, className = '' }: Props) => (
  <div className={`${className} h-mobile max-h-screen absolute w-full`}>
    <Head>
      {title && <title>{title}</title>}
      <link rel="shortcut icon" href="/icon.png" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </div>
)

export default Layout
