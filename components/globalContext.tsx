import React, { useState, createContext } from "react"


type DraftTabHide = {
    hideDraftTab: boolean,
    setHideDraftTab: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalCtx = createContext<DraftTabHide | undefined>(undefined)

interface GlobalContextProps {
    children: JSX.Element[]
}

const GlobalContext = ({ children }: GlobalContextProps) => {
    const [hideDraftTab, setHideDraftTab] = useState<boolean>(false)

    return (
        <GlobalCtx.Provider
            value={{ hideDraftTab, setHideDraftTab }}
        >
            {children}
        </GlobalCtx.Provider>
    )
}

export default GlobalContext