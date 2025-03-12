'use client'
import React from 'react'




const Backdrop = ({onClick}: {
    onClick: () => void;
}) => {
  return (
    <div onClick={onClick} className='absolute z-40 h-screen w-screen'>
      
    </div>
  )
}

export default Backdrop;
