import React, { useContext, useEffect, useState } from 'react'
import { Champion } from '../utils/champion';
import Image from 'next/image'
import { ChampionCtx } from './championContext';

interface Props {
    teamName: string,
    selectedChampion: Champion,
    setSelectedChampion: (selectedChampion: Champion) => void,
}

const TeamChampions = ({teamName, selectedChampion, setSelectedChampion }: Props) => {

    const cm = useContext(ChampionCtx)

    const handleImageClick = (e: any) => {
        if(selectedChampion.splashImage){
            const champions = structuredClone(cm?.mapChampions)!

        if(e.type === 'click'){
            if(selectedChampion.splashImage !== 'blank.webp'){
                if(teamName === 'blue'){
                    if(champions.blue.length < 5){
                        champions?.blue.push(selectedChampion)
                        cm?.setMapChampions(champions)
                    }
                }
                if(teamName === 'red'){
                    if(champions.red.length < 5){
                        champions?.red.push(selectedChampion)
                        cm?.setMapChampions(champions)
                    }
                }

                (e.target as HTMLImageElement).setAttribute('srcset', selectedChampion.splashImage);
                (e.target as HTMLImageElement).setAttribute('id', selectedChampion.name);
                setSelectedChampion({ name: '', image: 'blank.webp', splashImage: 'blank.webp'})
            }
        }

        // right click to remove champion from draft and map
        if(e.type === "contextmenu"){
            e.preventDefault();
            (e.target as HTMLImageElement).setAttribute('srcset', 'blank.webp');

            if(teamName === 'blue'){
                const imageId = (e.target as HTMLImageElement).getAttribute('id')
                if(imageId !== "blank"){
                    const updatedBlueChampions = champions.blue.filter((c) => c.name !== imageId)
                    console.log('imageid was:', imageId)
                    champions.blue = updatedBlueChampions
                    cm?.setMapChampions(champions)
                }
            }
            if(teamName === 'red'){
                const imageId = (e.target as HTMLImageElement).getAttribute('id')
                if(imageId !== "blank"){
                    const updatedBlueChampions = champions.red.filter((c) => c.name !== imageId)
                    console.log('imageid was:', imageId)
                    champions.red = updatedBlueChampions
                    cm?.setMapChampions(champions)
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
            {[...Array(5)].map((e, idx) =>
            <div
                className="w-60 h-[6rem] dark:bg-zinc-800 my-2 relative"
                key={teamName + '-' + idx + 1}
            > 
                    <Image
                        id={"blank"}
                        layout='fill'
                        objectFit='cover'
                        objectPosition={'0px -12px'}
                        src={'/blank.webp'}
                        alt="champion name"
                        className="cursor-pointer"
                        onContextMenu={(e) => {handleImageClick(e)}}
                        onClick={(e) => {handleImageClick(e)}}
                    >
                    </Image>
            </div>)}
        </div>
    )
}

export default TeamChampions