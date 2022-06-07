import React from 'react'

interface TeamNameTitleCardProps {
    teamName: string
}

const TeamNameTitleCard = ({ teamName }: TeamNameTitleCardProps) => {
  return (
    <div
        className={
            `w-full
            mx-5 mt-1
            font-semibold
            text-3xl
            border-zinc-800
            ${teamName === 'blue' 
                ? 'justify-start text-left' 
                : 'justify-end text-right'}`}
    >
        <input className={
            `rounded-sm
            px-2 py-1
            ${teamName === 'blue'
                ? 'text-left' 
                : 'text-right'}
            `}>
        </input>
    </div>
  )
}

export default TeamNameTitleCard