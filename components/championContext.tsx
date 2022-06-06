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

const initialChampion: Champion = {
    name: "",
    image: "/blank.webp",
    splashImage: "/blank.webp",
}

const initialArr = Array(5).fill(initialChampion)

interface ChampionContextProps {
    children: JSX.Element[]
}

const ChampionContext = ({ children }: ChampionContextProps) => {
    const [mapChampions, setMapChampions] = useState<MapChampions>({ blue: initialArr, red: initialArr })

    return (
        <ChampionCtx.Provider
            value={{ mapChampions, setMapChampions }}
        >
            {children}
        </ChampionCtx.Provider>
    )
}

export default ChampionContext