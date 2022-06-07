import React, { useEffect } from 'react'
import {useTheme} from 'next-themes'

const Navbar = () => {
    useEffect(() => {
        setTheme('dark')
    }, [])

    const {theme, setTheme} = useTheme()

    return (
        <div className="flex justify-center w-screen h-16">
            <div className='mx-5'>
            </div>
        </div>
    )
}

export default Navbar