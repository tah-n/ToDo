'use client'
import React from 'react'
import MenuItem from './ui/MenuItem'

const TopMenu = () => {
    
  return (
    <div className='w-full h-[70px] sm:h-[50px] px-2 py-1 border-b border-teal shadow-lg text-ice/70 uppercase sm:text-[16px] tracking-wide flex items-end gap-0 sm:gap-5'>
        <MenuItem  text='upcomming tasks' />
        <MenuItem text='completed tasks' />
        <MenuItem text='missed tasks' />
    </div>
  )
}

export default TopMenu;
