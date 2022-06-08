import React, { useEffect, useContext } from 'react'
import {useTheme} from 'next-themes'
import { GlobalCtx } from './globalContext'
import { BiChevronLeft } from 'react-icons/bi'

const Navbar = () => {
    useEffect(() => {
        setTheme('dark')
    }, [])

    const {theme, setTheme} = useTheme()
    const gc = useContext(GlobalCtx)!

    return (
        <div className="
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
                    text-5xl
                    ${gc.hideDraftTab && 'rotate-180'}
                    cursor-pointer
                    text-zinc-400
                    hover:contrast-200
                    hover:brightness-200
                `}
                >
                </BiChevronLeft>
          </div>
        </div>
    )
}

export default Navbar