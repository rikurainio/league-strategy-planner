/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import Draggable from 'react-draggable'
import { ChampionCtx } from './championContext'
import { GlobalCtx } from './globalContext'
import MapChampion from './mapChampion'
import Spinner from './spinner'

interface MapContainerProps {
  hideDraftTab: boolean
}

export const MapContainer = ({ hideDraftTab }: MapContainerProps) => {
  const [loading, setLoading] = useState(true)
  const [render, setRerender] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const gc = useContext(GlobalCtx)
  const cm = useContext(ChampionCtx)
  const champions = cm?.mapChampions!

  const getSpawnPoint = (side: string) => {
    let spawnPoint = {x:0, y:0}

    side === 'blue'
    ? spawnPoint = {x:25, y:600}
    : spawnPoint = {x:820, y:30}
    return spawnPoint
  }

  const handleScroll = (e: any) => {
    e.preventDefault

    if(e.deltaY < 0){
      gc?.setZoom(gc.zoom + .2)
    }
    if(e.deltaY > 0 && gc?.zoom! > 1){
      gc?.setZoom(gc.zoom - .2  )
    }
  }

  return (
      <>
      { hideDraftTab && <div
        onWheel={(e) => {handleScroll(e)}}
        className={`
          flex
          flex-col
          fixed
          content-center
          ${hideDraftTab && 'm-0 w-[1091px] h-[916px]'}
      `}>
          <Draggable
            onStart={(e) => {e.stopPropagation}}
            >
              <div>
                <img
                  draggable='false'
                  style={{ transform: `scale(${gc?.zoom.toFixed(1)})` }}
                  className={`
                    cursor-pointer
                    opacity-100
                    contrast-100
                  `}
                  alt="SR"
                  width={"1091px"}
                  height={"916px"}
                  src={hideDraftTab === true ? '/SRFull.jpg' : '/sr-alcove.png'}
                >
                </img>
              </div>
            </Draggable>


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
      </div> }

      { !hideDraftTab && <div
        className={`
          flex
          flex-col
          content-center
          ${!hideDraftTab && 'relative w-full h-full'}
      `}>
              <div>
                <img
                  draggable='false'
                  className={`
                    cursor-pointer
                    opacity-100
                    contrast-100
                    ${!hideDraftTab && 'scale-100'}
                  `}
                  alt="SR"
                  width={"1091px"}
                  height={"916px"}
                  src='/sr-alcove.png'
                >
                </img>
              </div>


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
      </div> }
      </>
  )
}
