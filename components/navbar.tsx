import React from 'react'
import {useTheme} from 'next-themes'

const Navbar = () => {
    const {theme, setTheme} = useTheme()

    return (
        <div className="flex justify-center w-screen h-6 border-b-2 border-gray-500">
            <div className='mx-5'>
                Navbar
            </div>
            <div className='mx-5'>
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    darkmode toggler
                </button>
            </div>
        </div>
    )
}

export default Navbar