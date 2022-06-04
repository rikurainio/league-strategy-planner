import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { ChampionCtx } from './championContext'
import MapChampion from './mapChampion'

export const MapContainer = () => {
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
    <div className="flex flex-col content-center w-full relative m-5">
          <Image
            className="pointer-events-none opacity-0"
            alt="SR"
            src={"/sr-alcove.png"}
            layout="fill"
          >
          </Image>

          { champions.blue.map((c) =>
            <MapChampion
              teamName="blue" 
              champion={c} 
              key={`draggable-blue-${c.name}`}
              spawnPoint={getSpawnPoint('blue')}
              />
          )}
          { champions.red.map((c) =>
            <MapChampion
              teamName="red"
              champion={c}
              key={`draggable-red-${c.name}`}
              spawnPoint={getSpawnPoint('red')}
              />
          )}
    </div>
  )
}
