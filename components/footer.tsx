import React, { useContext } from 'react'
import { GlobalCtx } from './globalContext'

const Footer = () => {

  const gc = useContext(GlobalCtx)

  return (
    <div
      className={`
        flex 
        justify-center 
        w-screen 
        h-36 
        bg-gray-900
        ${gc?.hideDraftTab && 'hidden'}
        `}>
        <div className='mt-10'>
        </div>
    </div>
  )
}

export default Footer