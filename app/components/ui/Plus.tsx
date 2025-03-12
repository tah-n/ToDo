import React from 'react'

export const Plus = ({className}:{
    className?: string
}) => {
  return (
    <div className={`${className} w-[1.5rem] h-[1.5rem] rotate-90 flex items-center justify-center`}>
      <div className='w-[1.5rem] h-[3px] bg-ice' />
      <div className='relative w-[4px] h-[1.3rem] bg-ice right-1/2' />
    </div>
  )
}


