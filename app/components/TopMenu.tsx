'use client'
import React, { useEffect } from 'react'
import MenuItem from './ui/MenuItem'
import gsap from 'gsap'

const TopMenu = () => {

  useEffect(() => {
    const timeLine = gsap.timeline();
    timeLine.to('.item', {
      delay: 0.5,
      duration:0.4,
      y:0,
      opacity:1,
      stagger:0.2
    })

    return () => {
      timeLine.kill();
    }
  },[])
    
  return (
    <div className='w-full h-[70px] sm:h-[50px] px-2 py-1 border-b border-teal shadow-lg text-ice/70 uppercase sm:text-[16px] tracking-wide flex items-end gap-0 sm:gap-5'>
        <MenuItem className='item opacity-10 -translate-y-6'  text='upcomming tasks' />
        <MenuItem className='item opacity-10 -translate-y-6' text='completed tasks' />
        <MenuItem className='item opacity-10 -translate-y-6' text='missed tasks' />
    </div>
  )
}

export default TopMenu;
