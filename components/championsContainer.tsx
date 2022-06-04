import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { Champion, getAllChampions } from '../utils/champion';
import ChampionSearch from './championSearch';
import TeamChampions from './teamChampions';
import TeamBans from './teamBans';
import { ChampionCtx } from './championContext';

const ChampionsContainer = () => {
    const [filter, setFilter] = useState('')
    const [activeChamp, setActiveChamp] = useState<string>("")
    const [banneds, setBanneds] = useState([])
    const [selectedChampion, setSelectedChampion] = useState<Champion>({ name: '', image: '', splashImage: ''})
    const champions: Champion[] = getAllChampions()

    const cm = useContext(ChampionCtx)!

    const championIsDrafted = (c: Champion): boolean => {
        const blue = cm.mapChampions.blue
        const red = cm.mapChampions.red
        const all = blue.concat(red)

        if(all.find((ch) => ch.name === c.name) !== undefined){
            return true
        }
        return false
    }

    const championIsBanned = (c: Champion): boolean => {
        const found = banneds.filter((ch) => (ch === c.name))
        if(found !== undefined && found.length > 0){
            return true 
        }
        return false
    }

    const isActiveChamp = (c: Champion) => {
        if(activeChamp === c.name){
            return true
        }
        return false
    }

    const handleClickChampion = (e:any, c: Champion) => {
        setSelectedChampion(c)
        setActiveChamp(c.name)
    }

    return (
        <div className="
            w-full
            flex flex-col
            border-l-8 border-l-blue-500
            border-r-8 border-r-red-500
            dark:bg-zinc-900
            "
            >
            <div className="flex">
                <TeamBans
                    teamName='blue'
                    selectedChampion={selectedChampion} 
                    setSelectedChampion={setSelectedChampion}
                    banneds={banneds}
                    setBanneds={setBanneds}
                    setActiveChamp={setActiveChamp}
                />
                <TeamBans
                    teamName='red'
                    selectedChampion={selectedChampion} 
                    setSelectedChampion={setSelectedChampion}
                    banneds={banneds}
                    setBanneds={setBanneds}
                    setActiveChamp={setActiveChamp}
                />
            </div>

            <div id="champions-container" className="flex justify-center h-[40rem] w-full">
                <TeamChampions
                    teamName='blue'
                    selectedChampion={selectedChampion} 
                    setSelectedChampion={setSelectedChampion}
                    setActiveChamp={setActiveChamp}

                />

                <div className='w-full'>
                    <div className="h-9 mb-2">
                        <ChampionSearch filter={filter} setFilter={setFilter} />
                    </div>

                    <div className="flex justify-center flex-wrap max-h-[33rem] overflow-y-scroll">
                    {champions
                        .filter((c) => c.name.toLowerCase().includes(filter))
                        .sort((c, d) => c.name.localeCompare(d.name))
                        .map((c) =>
                    <div
                        key={'champion-' + c.name}
                        className={`
                            m-1
                            w-24
                            ${championIsBanned(c) ? ' saturate-0 pointer-events-none ' : ' ' } 
                            ${championIsDrafted(c) ? ' saturate-0 pointer-events-none ' : ' ' }`
                        }

                        onClick={(e) => {handleClickChampion(e,c)}}
                    >
                        <Image
                            src={c.image}
                            width="76"
                            height="76"
                            className={`
                                cursor-pointer
                                rounded-lg
                                hover:brightness-125
                                hover:scale-100
                                z-40
                                ${isActiveChamp(c) ? 'outline outline-zinc-300' : ''}`
                            }
                            alt={c.name}>
                        </Image>

                        <div className={`
                            w-full 
                            truncate 
                            dark:text-gray-300 
                            -mt-2
                            `}>
                            {c.name}
                        </div>
                    </div>
                    )}
                    </div>
                </div>

                <TeamChampions
                    teamName='red'
                    selectedChampion={selectedChampion}
                    setSelectedChampion={setSelectedChampion}
                    setActiveChamp={setActiveChamp}

                />
            </div>
        </div>
    )
}

export default ChampionsContainer