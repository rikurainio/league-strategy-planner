import React, { useEffect, useContext } from 'react'
import {useTheme} from 'next-themes'
import { GlobalCtx } from './globalContext'
import { BiChevronLeft } from 'react-icons/bi'
import { CgZoomIn } from 'react-icons/cg'

const Navbar = () => {
    const {theme, setTheme} = useTheme()
    const gc = useContext(GlobalCtx)!

    useEffect(() => {
        setTheme('dark')
    }, [setTheme])

    const handleClickZoom = () => {
        gc.setZoom(gc.zoom+.1)
      }
    
    return (
        <div className="
            overflow-hidden
            flex justify-center
            h-full
            top-0
            left-0
            fixed
            z-10"
          >
            <div>
                <BiChevronLeft
                    onClick={() => { gc.setHideDraftTab(!gc.hideDraftTab) }}
                    className={`
                        ml-1
                        mt-10
                        text-5xl
                        ${gc.hideDraftTab && 'rotate-180'}
                        cursor-pointer
                        text-zinc-400
                        hover:contrast-200
                        hover:brightness-200
                    `}
                >
                </BiChevronLeft>
                {/*
                <CgZoomIn
                    onClick={() => {handleClickZoom()}}
                    className={`
                    text-5xl
                    mt-1
                    ml-1
                    cursor-pointer
                    text-zinc-400
                    hover:contrast-200
                    hover:brightness-200
                `}
                >
                    
                </CgZoomIn>
                */}
          </div>
        </div>
    )
}

export default Navbar