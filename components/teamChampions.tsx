import React, { useContext, useState } from 'react'
import { Champion } from '../utils/champion';
import { ChampionCtx } from './championContext';
import Image from 'next/image'

interface ChampionWithIdx extends Champion {
    idx: number
    team: string
}

interface Props {
    teamName: string,
    selectedChampion: Champion,
    previousChamp: ChampionWithIdx | null,

    setActiveChamp: (activeChamp: string) => void,
    setSelectedChampion: (selectedChampion: Champion) => void,
    setPreviousChamp: (previousChamp: ChampionWithIdx | null) => void
}

const TeamChampions = ({ 
        teamName, 
        selectedChampion, 
        setSelectedChampion,
        setActiveChamp,
        previousChamp,
        setPreviousChamp
    }: Props) => {

    const cm = useContext(ChampionCtx)!
    const blank = {name: "", image: "/blank.webp", splashImage: "/blank.webp"}

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

                    if(teamName === 'blue'){
                        if(previousChamp !== null){
                            if(previousChamp.team === teamName){
                                console.log('swapping')
                                const copyBlue = [...cm.mapChampions.blue]
                                const current = c
                                const currentIdx = idx
                                const previous = previousChamp
        
                                copyBlue[previous.idx] = current
                                copyBlue[currentIdx] = previous
                                cm?.setMapChampions({ blue: copyBlue, red: cm.mapChampions.red})
                                setPreviousChamp(null)
                            }
                            else{
                                const copyBlue = [...cm.mapChampions.blue]
                                const copyRed = [...cm.mapChampions.red]

                                copyRed[previousChamp.idx] = c
                                copyBlue[idx] = previousChamp

                                cm?.setMapChampions({ blue: copyBlue, red: copyRed })
                                setPreviousChamp(null)
                            }
                        }
                        else{
                            const cWithIndex = {...c, idx: idx, team: teamName}
                            setPreviousChamp(cWithIndex)
                        }
                    }
                    if(teamName === 'red'){
                        if(previousChamp !== null){
                            if(previousChamp.team === teamName){
                                console.log('swapping')
                                const copyRed = [...cm.mapChampions.red]
                                const current = c
                                const currentIdx = idx
                                const previous = previousChamp
        
                                copyRed[previous.idx] = current
                                copyRed[currentIdx] = previous
                                cm?.setMapChampions({ blue: cm.mapChampions.blue, red: copyRed})
                                setPreviousChamp(null)
                            }
                            else{
                                const copyBlue = [...cm.mapChampions.blue]
                                const copyRed = [...cm.mapChampions.red]

                                copyBlue[previousChamp.idx] = c
                                copyRed[idx] = previousChamp

                                cm?.setMapChampions({ blue: copyBlue, red: copyRed })
                                setPreviousChamp(null)
                            }
                        }
                        else{
                            const cWithIndex = {...c, idx: idx, team: teamName}
                            setPreviousChamp(cWithIndex)
                        }
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

    const checkActive = (c: Champion): boolean => {
        if(previousChamp?.name === c.name){
            return true
        }
        return false
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
                className={`
                    w-60 h-[6rem] 
                    dark:bg-zinc-800 
                    relative
                    ${idx > 0 && 'mt-6'}
                    ${checkActive(c) && 'outline outline-zinc-300'}`}
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
                className={`
                    w-60 h-[6rem] 
                    dark:bg-zinc-800 
                    relative
                    ${idx > 0 && 'mt-6'}
                    ${checkActive(c) && 'outline outline-zinc-300'}`}
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