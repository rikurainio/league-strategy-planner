import React, { useContext, useState } from 'react'
import { Champion } from '../utils/champion';
import { ChampionCtx } from './championContext';
import Image from 'next/image'

interface Props {
    teamName: string,
    selectedChampion: Champion,
    setSelectedChampion: (selectedChampion: Champion) => void,
    setActiveChamp: (activeChamp: string) => void
}

interface ChampionWithIdx extends Champion {
    idx: number
}

const TeamChampions = ({teamName, selectedChampion, setSelectedChampion ,setActiveChamp }: Props) => {
    const cm = useContext(ChampionCtx)!
    const blank = {name: "", image: "/blank.webp", splashImage: "/blank.webp"}
    const [previousChamp, setPreviousChamp] = useState<ChampionWithIdx | null>(null)

    const handleImageClick = (e: any, c: Champion ,idx: number) => {
        if(selectedChampion.splashImage){
            // left click a draft tile
            if(e.type === 'click'){
                setActiveChamp("")
                if(selectedChampion.splashImage !== 'blank.webp'){
                    if(teamName === 'blue'){
                        const copyBlue = [...cm.mapChampions.blue]
                        copyBlue[idx] = selectedChampion
                        cm?.setMapChampions({ blue: copyBlue, red: cm.mapChampions.red})
                        setSelectedChampion({ name: '', image: 'blank.webp', splashImage: 'blank.webp'})
                    }
                    if(teamName === 'red'){
                        const copyRed = [...cm.mapChampions.red]
                        copyRed[idx] = selectedChampion
                        cm?.setMapChampions({ blue: cm.mapChampions.blue, red: copyRed})
                        setSelectedChampion({ name: '', image: 'blank.webp', splashImage: 'blank.webp'})
                    }
                }
                else{
                    // clicked on a tile with champ
                    setSelectedChampion(c)
                    console.log('previous champ:', previousChamp)
                    console.log('selected a champ:', c)

                    if(previousChamp !== null){
                        console.log('swapping')
                        const copyBlue = [...cm.mapChampions.blue]
                        const current = c
                        const currentIdx = idx
                        const previous = previousChamp

                        console.log('currentIdx:', currentIdx, 'previousIdx:', previous.idx)

                        copyBlue[previous.idx] = current
                        copyBlue[currentIdx] = previous
                        cm?.setMapChampions({ blue: copyBlue, red: cm.mapChampions.red})
                        setPreviousChamp(null)
                    }
                    else{
                        const cWithIndex = {...c, idx: idx}
                        setPreviousChamp(cWithIndex)
                    }
                    setSelectedChampion({ name: '', image: 'blank.webp', splashImage: 'blank.webp'})
                }
            }
            // right click a draft tile
            if(e.type === "contextmenu"){
                e.preventDefault();

                if(c.splashImage !== 'blank.webp'){
                    if(teamName === 'blue'){
                        const copyBlue = [...cm.mapChampions.blue]
                        copyBlue[idx] = blank
                        cm?.setMapChampions({ blue: copyBlue, red: cm.mapChampions.red})
                        setSelectedChampion({ name: '', image: 'blank.webp', splashImage: 'blank.webp'})
                    }
                    if(teamName === 'red'){
                        const copyRed = [...cm.mapChampions.red]
                        copyRed[idx] = blank
                        cm?.setMapChampions({ blue: cm.mapChampions.blue, red: copyRed})
                        setSelectedChampion({ name: '', image: 'blank.webp', splashImage: 'blank.webp'})
                    }
                }
            }
        }
    }

    return (
        <div className={`
            flex 
            flex-col 
            items-center 
          dark:bg-zinc-900
            mx-4
            `} 
        >
            {teamName === 'blue' && cm?.mapChampions.blue.map((c, idx) =>
            <div
                className={`w-60 h-[6rem] dark:bg-zinc-800 ${idx > 0 && 'mt-6'} relative`}
                key={teamName + '-' + idx}
                > 
                    <div id={"btext-" + idx} className={`absolute z-50 ml-2 m-1`}>
                        {c.name}
                    </div>
                    <Image
                        id={"blank"}
                        layout='fill'
                        objectFit='cover'
                        objectPosition={'0px -12px'}
                        src={c.splashImage}
                        alt="champion name"
                        className="cursor-pointer"
                        onContextMenu={(e) => {handleImageClick(e, c, idx)}}
                        onClick={(e) => {handleImageClick(e, c, idx)}}
                    >
                    </Image>
            </div>)}
            {teamName === 'red' && cm?.mapChampions.red.map((c, idx) =>
            <div
                className={`w-60 h-[6rem] dark:bg-zinc-800 ${idx > 0 && 'mt-6'} relative`}
                key={teamName + '-' + idx}
                > 
                    <div id={"btext-" + idx} className={`absolute z-50 ml-2 m-1`}>
                        {c.name}
                    </div>
                    <Image
                        id={"blank"}
                        layout='fill'
                        objectFit='cover'
                        objectPosition={'0px -12px'}
                        src={c.splashImage}
                        alt="champion name"
                        className="cursor-pointer"
                        onContextMenu={(e) => {handleImageClick(e, c, idx)}}
                        onClick={(e) => {handleImageClick(e, c, idx)}}
                    >
                    </Image>
            </div>)}
        </div>
    )
}

export default TeamChampions