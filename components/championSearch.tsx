import React from 'react'

interface SearchProps {
  filter: string,
  setFilter: (value: string | ((prevVar: string) => string)) => void;
}

const ChampionSearch = ({ filter, setFilter }: SearchProps) => {
  return (
      <input
        className="w-full h-full pl-2 focus:outline-none" 
        placeholder="Filter champions"
        value={filter}
        onChange={(e) => {setFilter(e.target.value.toLowerCase())}}
      >
      </input>
  )
}

export default ChampionSearch