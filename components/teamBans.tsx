import React, { useEffect, useState, useContext } from 'react'
import { Champion } from '../utils/champion';
import Image from 'next/image'
import { ChampionCtx } from './championContext';

interface Bans {
    blue: Champion[],
    red: Champion[]
}

interface Props {
    teamName: string,
    banneds: Bans,
    selectedChampion: Champion,
    setBanneds: (banneds: Bans) => void,
    setActiveChamp: (activeChamp: string) => void
    setSelectedChampion: (selectedChampion: Champion) => void
}

const blank = {name: "", image: "/blank.webp", splashImage: "/blank.webp"}

const TeamBans = ({teamName, selectedChampion, setSelectedChampion, banneds, setBanneds, setActiveChamp }: Props) => {
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
            }
            // right click a draft tile
            if(e.type === "contextmenu"){
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