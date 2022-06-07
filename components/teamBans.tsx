import React, { useEffect, useState, useContext } from 'react'
import { Champion } from '../utils/champion';
import { ChampionCtx } from './championContext';
import Image from 'next/image'

interface Bans {
    blue: Champion[],
    red: Champion[],
    [key: string]: Champion[]
}

interface ChampionWithIdx extends Champion {
    idx: number
    team: string
    type: string
}

interface Props {
    teamName: string,
    banneds: Bans,
    previousChamp: ChampionWithIdx | null,
    selectedChampion: Champion,
    setBanneds: (banneds: Bans) => void,
    setActiveChamp: (activeChamp: string) => void
    setPreviousChamp: (previousChamp: ChampionWithIdx | null) => void
    setSelectedChampion: (selectedChampion: Champion) => void
}

const blank = {name: "", image: "/blank.webp", splashImage: "/blank.webp"}

const TeamBans = ({
    teamName, 
    selectedChampion, 
    setSelectedChampion,
    previousChamp, setPreviousChamp, 
    banneds, setBanneds, setActiveChamp }: Props) => {

    const cm = useContext(ChampionCtx)!

    const handleImageClick = (e: any, c: Champion, idx: number) => {
        setActiveChamp("")

        if(selectedChampion.image){
            // left click a draft tile
            if(e.type === 'click'){
                if(selectedChampion.splashImage !== 'blank.webp'){
                    if(teamName === 'blue'){
                        const copyBlue = [...banneds.blue]
                        copyBlue[idx] = selectedChampion
                        setBanneds({ blue: copyBlue, red: banneds.red })
                        setSelectedChampion({ name: '', image: 'blank.webp', splashImage: 'blank.webp'})
                    }
                    if(teamName === 'red'){
                        const copyRed = [...banneds.red]
                        copyRed[idx] = selectedChampion
                        setBanneds({ blue: banneds.blue, red: copyRed })
                        setSelectedChampion({ name: '', image: 'blank.webp', splashImage: 'blank.webp'})
                    }
                }
                // clicked on a tile with champ
                else{
                    if(previousChamp !== null){
                        if(previousChamp.team === teamName && previousChamp.type === 'ban'){
                            const copyTeamBans =  [...banneds[teamName]]
                            const current = c
                            const currentIdx = idx
                            const previous = previousChamp

                            copyTeamBans[previous.idx] = current
                            copyTeamBans[currentIdx] = previous

                            const copyBanneds = {...banneds}
                            copyBanneds[teamName] = copyTeamBans
                            setBanneds(copyBanneds)
                            setPreviousChamp(null)
                        }
                        if(teamName !== previousChamp.team && previousChamp.type === 'ban'){
                            const copyTeamBans = [...banneds[teamName]]
                            const copyPreviousTeamBans = [...banneds[previousChamp.team]]
                            const copyBanneds = {...banneds}
                            const current = c
                            const previous = previousChamp

                            copyTeamBans[idx] = previousChamp
                            copyPreviousTeamBans[previousChamp.idx] = current

                            copyBanneds[teamName] = copyTeamBans
                            copyBanneds[previousChamp.team] = copyPreviousTeamBans

                            setBanneds(copyBanneds)
                            setPreviousChamp(null)
                        }
                        else{   
                            if(previousChamp.type === 'pick'){
                                const copyTeamBans =  [...banneds[teamName]]

                                const cmCopy = {...cm.mapChampions}
                                const prevTeamCopy = cm.mapChampions[previousChamp.team]
                                const copyBanneds = {...banneds}

                                copyBanneds[teamName] = copyTeamBans
                                prevTeamCopy[previousChamp.idx] = c
                                copyTeamBans[idx] = previousChamp

                                cmCopy[previousChamp.team] = prevTeamCopy
                                cm.setMapChampions(cmCopy)
                                
                                setBanneds(copyBanneds)
                                setPreviousChamp(null)
                            }
                        } 
                    }
                    else{
                        const cWithIndex = {...c, idx: idx, team: teamName,type: 'ban'}
                        setPreviousChamp(cWithIndex)
                    }
                }
            }
            
            // right click a draft tile
            else if(e.type === "contextmenu"){
                e.preventDefault();

                if(c.splashImage !== 'blank.webp'){
                    if(teamName === 'blue'){
                        const copyBlue = [...banneds.blue]
                        copyBlue[idx] = blank
                        setBanneds({ blue: copyBlue, red: banneds.red})
                        setSelectedChampion({ name: '', image: 'blank.webp', splashImage: 'blank.webp'})
                    }
                    if(teamName === 'red'){
                        const copyRed = [...banneds.red]
                        copyRed[idx] = blank
                        setBanneds({ blue: banneds.blue, red: copyRed})
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
            ${teamName === 'blue' ? 'justify-start' : 'justify-end'} 
            w-full 
            dark:bg-zinc-900
            rounded-sm
            py-4
            mx-4
            `}>
                
            {teamName === 'blue' && banneds.blue.map((c, idx) =>
            <div
                id={'ban-' + c.name}
                key={teamName + '-' + idx + 1}
                className={`
                dark:bg-zinc-800
                  rounded
                  ${idx === 2 && 'mr-8'}
                  ${checkActive(c) && 'outline outline-2 outline-zinc-300'}
                  h-10 
                  w-10 
                  m-1`
                }
            >  
                <Image
                    id={"img-" + teamName + "-" + idx + 1}
                    width="40"
                    height="40"
                    src={c.image}
                    alt="champion-name"
                    className="cursor-pointer rounded-sm"
                    onContextMenu={(e) => {handleImageClick(e, c, idx)}}
                    onClick={(e) => {handleImageClick(e, c, idx)}}
                >
                </Image>
            </div>)}

            {teamName === 'red' && banneds.red.map((c, idx) =>
            <div
                id={'ban-' + c.name}
                key={teamName + '-' + idx + 1}
                className={`
                dark:bg-zinc-800
                  rounded
                  ${idx === 1 && 'mr-8'}
                  ${checkActive(c) && 'outline outline-2 outline-zinc-300'}
                  h-10 
                  w-10 
                  m-1`
                }
            >  
                <Image
                    id={"img-" + teamName + "-" + idx + 1}
                    width="40"
                    height="40"
                    src={c.image}
                    alt="champion-name"
                    className="cursor-pointer rounded-sm"
                    onContextMenu={(e) => {handleImageClick(e, c, idx)}}
                    onClick={(e) => {handleImageClick(e, c, idx)}}
                >
                </Image>
            </div>)}
        </div>
    )
}

export default TeamBans