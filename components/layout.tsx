import React, { ReactNode } from 'react';
import Navbar from './navbar'
import Footer from './footer'
import GlobalContext from './globalContext';

type Props = {
    children?: ReactNode
    title?: string
  }

const Layout = ({ children }: Props ) => {
  return (
    <>
      <GlobalContext>
        <Navbar />
          <main>
            {children}
          </main>
        <Footer />
      </GlobalContext>
      
    </>
  )
}

export default Layout