'use client'
import React from 'react'
import useProps from '../lib/useProps';

interface ItemTypes {
    className?: string;
    text: string;
}

const MenuItem = ({className,text}: ItemTypes) => {
    const setChosenMenuItem = useProps((state) => state.setChosenMenuItem);
    const chosenMenuItem = useProps((state) => state.chosenMenuItem);

    const handleClick = (text: string) => {
        setChosenMenuItem(text);
    }
  return (
    <div onClick={() => handleClick(text)} className={`${className} h-[50px] w-fit sm:h-fit ${chosenMenuItem === text? 'text-ice' : 'text-ice/60'} text-[14px] sm:text-[16px] transition-all duration-400 ease-in-out cursor-pointer`}>
        <p className='pointer-events-none w-[85px] mr-4 sm:mr-0 sm:w-fit'>
        {text}
        </p>
    </div>
  )
}

export default MenuItem;
