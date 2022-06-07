import Image from 'next/image'
import React from 'react'
import Draggable from 'react-draggable'
import { Champion } from '../utils/champion'

interface MapChampionProps {
    teamName: string,
    champion: Champion,
    spawnPoint: {x: number, y: number}
}

const MapChampion = ({ teamName, champion, spawnPoint }: MapChampionProps) => {
    const { x, y} = spawnPoint
    return (
        <Draggable
            defaultPosition={{x: x, y: y}}
        >
            <div className={`
                fixed
                w-16
                h-16
                rounded-full
                border-2
                cursor-pointer
                overflow-hidden
                hover:brightness-125
                ${teamName === 'blue'
                ? 'border-blue-500 bg-blue-500'
                : 'border-red-600 bg-red-600'}`}
            >
                <Image
                    className="
                        scale-110
                        rounded-full 
                        cursor-none
                        pointer-events-none
                    "
                    layout="fill"
                    objectPosition={""}
                    alt={champion.name}
                    src={champion.image}
                >
                </Image>
            </div>
        </Draggable>
    )
}

export default MapChampion