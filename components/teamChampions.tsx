import React, { useContext, useState } from 'react'
import { Champion } from '../utils/champion';
import { ChampionCtx } from './championContext';
import Image from 'next/image'

interface ChampionWithIdx extends Champion {
    idx: number
    team: string
    type: string
}

interface Bans {
    blue: Champion[],
    red: Champion[],
    [key: string]: Champion[]
}

interface Props {
    banneds: Bans,
    teamName: string,
    selectedChampion: Champion,
    previousChamp: ChampionWithIdx | null,

    setBanneds: (banneds: Bans) => void,
    setActiveChamp: (activeChamp: string) => void,
    setSelectedChampion: (selectedChampion: Champion) => void,
    setPreviousChamp: (previousChamp: ChampionWithIdx | null) => void
}

const TeamChampions = ({
        banneds,
        setBanneds,
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

                    if(previousChamp !== null){
                        if(previousChamp.type === 'pick'){
                            console.log('swapping')
                            const copyTeamPicks = cm.mapChampions[teamName]
                            const copyPreviousTeamPicks = cm.mapChampions[previousChamp.team]
                            const current = c
                            const currentIdx = idx
                            const previous = previousChamp
    
                            copyTeamPicks[currentIdx] = previousChamp
                            copyPreviousTeamPicks[previousChamp.idx] = current

                            const cmCopy = {...cm.mapChampions}
                            cmCopy[previousChamp.team] = copyPreviousTeamPicks
                            cmCopy[teamName] = copyTeamPicks

                            cm?.setMapChampions(cmCopy)
                            setPreviousChamp(null)
                        }
                        else{
                            if(previousChamp.type === 'ban'){
                                const copyTeamPicks = cm.mapChampions[teamName]
                                const cmCopy = {...cm.mapChampions}
                                const prevTeamCopy = [...banneds[previousChamp.team]]
                                const copyBanneds = {...banneds}

                                prevTeamCopy[previousChamp.idx] = c
                                copyTeamPicks[idx] = previousChamp

                                cmCopy[teamName] = copyTeamPicks

                                copyBanneds[previousChamp.team] = prevTeamCopy
                                cm.setMapChampions(cmCopy)

                                setBanneds(copyBanneds)
                                setPreviousChamp(null)
                            }
                        }
                    }
                    else{
                        const cWithIndex = {...c, idx: idx, team: teamName, type: 'pick'}
                        setPreviousChamp(cWithIndex)
                    }
                    setSelectedChampion({ name: '', image: 'blank.webp', splashImage: 'blank.webp'})
                }
            }
            // right click a draft tile
            else if(e.type === "contextmenu"){
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
        if(previousChamp?.name === c.name && c.name !== ""){
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
                    key={teamName + '-' + idx}
                    className="flex hover:brightness-110 duration-150"    
                >
                    <div className={`
                        px-1
                        flex flex-col
                        content-center justify-center
                        bg-zinc-800
                        ${idx > 0 && 'mt-6'}
                        ${idx === 2 && 'my-6'}`}
                    >
                        <div>B{idx+1}</div>
                    </div>
                    <div 
                        className={`
                            w-60 h-[6rem] 
                            dark:bg-zinc-800 
                            relative
                            ${idx > 0 && 'mt-6'}
                            ${idx === 2 && 'my-6'}
                            ${checkActive(c) && 'outline outline-zinc-300'}`}
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
                    </div>
                </div>
                
            )}


            {teamName === 'red' && cm?.mapChampions.red.map((c, idx) =>
            <div
                key={teamName + '-' + idx}
                className="flex hover:brightness-110 duration-150"
            >   
                <div
                    className={`
                        w-60 h-[6rem] 
                        dark:bg-zinc-800 
                        relative
                        ${idx > 0 && 'mt-6'}
                        ${idx === 2 && 'my-6'}
                        ${checkActive(c) && 'outline outline-zinc-300'}`}
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
                </div>

                <div className={`
                    px-1
                    flex flex-col
                    content-center justify-center
                    bg-zinc-800
                    ${idx > 0 && 'mt-6'}
                    ${idx === 2 && 'my-6'}`}
                >
                    <div>R{idx+1}</div>
                </div>
            </div>)}
        </div>
    )
}

export default TeamChampions