import React from 'react'

const Line = () => {
  return (
    <div className='absolute w-full h-full top-0 -z-40'>
        <div className='relative w-full h-full'>
            <div className='absolute bg-[#6b9080]/30 top-[30px] w-full h-[1px]' />
            <div className='absolute bg-[#6b9080]/30 bottom-[30px] w-full h-[1px]' />
        </div>
    
    </div>
  )
}

export default Line
