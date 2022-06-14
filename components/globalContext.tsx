import React, { useState, createContext } from "react"


type GlobalStates = {
    hideDraftTab: boolean,
    setHideDraftTab: React.Dispatch<React.SetStateAction<boolean>>,

    zoom: number,
    setZoom: React.Dispatch<React.SetStateAction<number>>,
}

export const GlobalCtx = createContext<GlobalStates | undefined>(undefined)

interface GlobalContextProps {
    children: JSX.Element[]
}

const GlobalContext = ({ children }: GlobalContextProps) => {
    const [hideDraftTab, setHideDraftTab] = useState<boolean>(false)
    const [zoom, setZoom] = useState<number>(1)

    return (
        <GlobalCtx.Provider
            value={{ hideDraftTab, setHideDraftTab, zoom ,setZoom }}
        >
            {children}
        </GlobalCtx.Provider>
    )
}

export default GlobalContext