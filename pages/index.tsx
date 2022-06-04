import type { NextPage } from 'next'
import React from 'react';
import ChampionContext from '../components/championContext';
import ChampionsContainer from '../components/championsContainer';
import { MapContainer } from '../components/mapContainer';

const Home: NextPage = () => {
  return (
    <div id="root-container" className="w-screen h-full min-h-screen">
          <div className="w-full flex justify-center p-2">

              <ChampionContext>
                <ChampionsContainer/>
                <MapContainer/>
              </ChampionContext>
              
          </div>
    </div>
  )
}

export default Home
