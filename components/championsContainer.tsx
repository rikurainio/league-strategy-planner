import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { Champion, getAllChampions } from '../utils/champion';
import ChampionSearch from './championSearch';
import TeamChampions from './teamChampions';
import TeamBans from './teamBans';
import { ChampionCtx } from './championContext';
import TeamNameTitleCard from './teamNameTitleCard';

interface ChampionWithIdx extends Champion {
    idx: number,
    team: string,
    type: string
}

/*
interface ChampionsContainerProps {
    hideDraftTab: boolean,
    setHideDraftTab: (hideDraftTab: boolean) => void
}
*/

interface Bans {
    blue: Champion[],
    red: Champion[],
    [key: string]: Champion[]
}

const blank = {name: "", image: "/blank.webp", splashImage: "/blank.webp"}
const filled5 = Array(5).fill(blank)

const ChampionsContainer = () => {
    const [filter, setFilter] = useState('')
    const [activeChamp, setActiveChamp] = useState<string>("")
    const [banneds, setBanneds] = useState<Bans>({ blue: filled5, red: filled5 })
    const [selectedChampion, setSelectedChampion] = useState<Champion>({ name: '', image: '', splashImage: ''})
    const [previousChamp, setPreviousChamp] = useState<ChampionWithIdx | null>(null)
    const cm = useContext(ChampionCtx)!
    const champions: Champion[] = getAllChampions()

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
        const bansCombined = banneds.blue.concat(banneds.red)
        const found = bansCombined.filter((ch) => (ch.name === c.name))
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
        <div className="flex w-full h-full">
            <div className="
                mx-10
                w-full
                flex flex-col
                border-l-8 border-l-blue-500
                border-r-8 border-r-red-500
                dark:bg-zinc-900
                "
                >
                <div className="flex">
                    <TeamNameTitleCard
                        teamName="blue"
                    />
                    <TeamNameTitleCard
                        teamName="red"
                    />
                </div>
                <div className="flex">
                    <TeamBans
                        teamName='blue'
                        selectedChampion={selectedChampion} 
                        setSelectedChampion={setSelectedChampion}
                        previousChamp={previousChamp}
                        setPreviousChamp={setPreviousChamp}
                        banneds={banneds}
                        setBanneds={setBanneds}
                        setActiveChamp={setActiveChamp}
                    />
                    <TeamBans
                        teamName='red'
                        selectedChampion={selectedChampion} 
                        setSelectedChampion={setSelectedChampion}
                        previousChamp={previousChamp}
                        setPreviousChamp={setPreviousChamp}
                        banneds={banneds}
                        setBanneds={setBanneds}
                        setActiveChamp={setActiveChamp}
                    />
                </div>

                <div id="champions-container" className="flex justify-center h-[40rem] w-full">
                    <TeamChampions
                        banneds={banneds}
                        setBanneds={setBanneds}
                        teamName='blue'
                        selectedChampion={selectedChampion} 
                        setSelectedChampion={setSelectedChampion}
                        setActiveChamp={setActiveChamp}
                        setPreviousChamp={setPreviousChamp}
                        previousChamp={previousChamp}
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
                        banneds={banneds}
                        setBanneds={setBanneds}
                        teamName='red'
                        selectedChampion={selectedChampion}
                        setSelectedChampion={setSelectedChampion}
                        setActiveChamp={setActiveChamp}
                        setPreviousChamp={setPreviousChamp}
                        previousChamp={previousChamp}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChampionsContainer