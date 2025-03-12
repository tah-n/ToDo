import React from 'react'

const Background = () => {

  return (
    <div className='absolute -z-50 top-0 w-full h-full'>
      <div className='relative top-0 left-0 w-full h-full'>
            <div className='absolute -z-40 top-0 w-full h-full bg-black/60 sm:h-[731px] lg:h-[738px]' />
            <img src='assets/background/background.png' className='absolute -z-50 top-0 w-full h-full sm:h-[731px] lg:h-[738px] ' alt='background' />
        </div>
    </div>
  )
}

export default Background;
