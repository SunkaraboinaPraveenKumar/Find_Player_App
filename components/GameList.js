import React, { useEffect, useState } from 'react'
import Data from './../shared/Data.js'
function GameList() {
  const [games,setGames]=useState([]);
  useEffect(()=>{
    setGames(Data.GameList);
  },[])
  return (
    <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 mt-4'>
      {
        games.map((game,index)=>(
          <div key={index} className='flex flex-col items-center cursor-pointer mt-2'>
            <img src={game.image} width={45} height={45} className='hover:animate-bounce transition-all duration-150'/>
            <h2 className='text-[14px] text-center'>{game.name}</h2>
          </div>
        ))
      }
    </div>
  )
}

export default GameList