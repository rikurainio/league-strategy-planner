import React, { useState, createContext } from "react"

import { Champion } from '../utils/champion'

interface MapChampions {
    blue: Champion[],
    red: Champion[]
}

type ChampionContext = {
    mapChampions: MapChampions
    setMapChampions: React.Dispatch<React.SetStateAction< MapChampions >>
}

export const ChampionCtx = createContext<ChampionContext | undefined>(undefined)

interface ChampionContextProps {
    children: JSX.Element[]
}

const ChampionContext = ({ children }: ChampionContextProps) => {
    const [mapChampions, setMapChampions] = useState<MapChampions>({ blue: [], red: [] })

    return (
        <ChampionCtx.Provider
            value={{ mapChampions, setMapChampions }}
        >
            {children}
        </ChampionCtx.Provider>
    )
}

export default ChampionContext