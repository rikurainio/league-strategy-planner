import React, { useEffect, useState, useContext } from 'react'
import { Champion } from '../utils/champion';
import Image from 'next/image'
import { ChampionCtx } from './championContext';

interface Props {
    teamName: string,
    selectedChampion: Champion,
    setSelectedChampion: (selectedChampion: Champion) => void
    banneds: string[],
    setBanneds: (banneds: any) => void,
    setActiveChamp: (activeChamp: string) => void
}

const TeamBans = ({teamName, selectedChampion, setSelectedChampion, banneds, setBanneds, setActiveChamp }: Props) => {
    const cm = useContext(ChampionCtx)

    const handleImageClick = (e: any, idx: number) => {
        setActiveChamp("")

        if(selectedChampion.image){
            // left click a draft tile
            if(e.type === 'click'){
                if(selectedChampion.splashImage !== 'blank.webp'){
                    (e.target as HTMLImageElement).setAttribute('srcset', selectedChampion.image);
                    (e.target as HTMLImageElement).setAttribute('id', selectedChampion.name);
 
                    setSelectedChampion({ name: '', image: 'blank.webp', splashImage: 'blank.webp'})
                    const b = [...banneds]
                    b.push(selectedChampion.name)
                    setBanneds(b)
                }
            }
            // right click a draft tile
            if(e.type === "contextmenu"){
                e.preventDefault();
                (e.target as HTMLImageElement).setAttribute('srcset', 'blank.webp');
    
                const imageId = (e.target as HTMLImageElement).getAttribute('id')
                const b = [...banneds]
                const updatedB = b.filter((c) => c !== imageId) 
                setBanneds(updatedB)
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
            {[...Array(5)].map((e, idx) =>
            <div
                id={banneds[idx]}
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
                    src={'/blank.webp'}
                    alt="champion-name"
                    className="cursor-pointer rounded-sm"
                    onContextMenu={(e) => {handleImageClick(e, idx)}}
                    onClick={(e) => {handleImageClick(e, idx)}}
                >
                </Image>
            </div>)}
        </div>
    )
}

export default TeamBans