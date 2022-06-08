import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { ChampionCtx } from './championContext'
import MapChampion from './mapChampion'

interface MapContainerProps {
  hideDraftTab: boolean
}

export const MapContainer = ({ hideDraftTab }: MapContainerProps) => {
  const cm = useContext(ChampionCtx)
  const champions = cm?.mapChampions!

  const getSpawnPoint = (side: string) => {
    let spawnPoint = {x:0, y:0}

    side === 'blue'
    ? spawnPoint = {x:25, y:600}
    : spawnPoint = {x:820, y:30}
    return spawnPoint
  }

  return (
    <div className={`
      flex flex-col
      content-center 
      w-full
      relative 
      ${hideDraftTab && 'w-[2000px] h-[1000px]'}
      ${hideDraftTab && 'm-0'}
      `}>
          <Image
            className="pointer-events-none opacity-100"
            alt="SR"
            layout="fill"
            objectFit={hideDraftTab === true ? 'contain' : 'contain'}
            src={hideDraftTab === true ? '/SRFull.jpg' : '/sr-alcove.png'}
            width={hideDraftTab === true ? '2440px' : '2560px'}
            height={hideDraftTab === true ? '2048px' : '1440px'}
          >
          </Image>

          { champions.blue.map((c, idx) =>
            c.name !== "" &&
              <MapChampion
              teamName="blue" 
              champion={c} 
              key={`draggable-blue-${c.name + '-' + idx}`}
              spawnPoint={getSpawnPoint('blue')}
              />
            
          )}
          { champions.red.map((c, idx) =>
            c.name !== "" &&
              <MapChampion
                teamName="red"
                champion={c}
                key={`draggable-red-${c.name + '-' + idx}`}
                spawnPoint={getSpawnPoint('red')}
                />
          )}
    </div>
  )
}
