import type { NextPage } from 'next'
import React, { useContext, useState } from 'react';
import ChampionContext from '../components/championContext';
import ChampionsContainer from '../components/championsContainer';
import { GlobalCtx } from '../components/globalContext';
import { MapContainer } from '../components/mapContainer';

const Home: NextPage = () => {
  const gc = useContext(GlobalCtx)!

  return (
    <div
      id="root-container"
      className={`
        flex 
        flex-col
        w-screen 
        h-full 
        min-h-screen 
        overflow-hidden
      `}
      >
          <div className="w-full h-full flex justify-center overflow-hidden mt-2">
              <ChampionContext>
                <>
                { !gc.hideDraftTab &&
                  <ChampionsContainer/>
                }
                </>
                <MapContainer
                  hideDraftTab={gc.hideDraftTab}
                />
              </ChampionContext>
          </div>
    </div>
  )
}

export default Home
