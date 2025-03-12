'use client'
import React from 'react';
import AddButton from './AddButton';
import useProps from './lib/useProps';

type AlarmProps = {
    title?: string;
    alarm?: string | number;
    className?: string;
}

const AlarmComponent = ({title,alarm, className}: AlarmProps) => {

    const handleClick = () => {
        useProps.getState().setAlarmIcon(false);
        useProps.getState().setAlarmTitle('');
        useProps.getState().setAlarmMin('');
    }
  return (
    <div className={`${className} absolute group sm:bottom-0 bg-[#A0DB9C]/50 backdrop-blur-2xl sm:right-0 m-5 flex flex-col items-center justify-center w-[320px] rounded-4xl shadow-md p-4 z-40`}>
        <div className='relative w-full flex items-center justify-center'>
            <img src='assets/little tree/happy (2).gif' width={200} height={200} className='w-[100px] sm:w-[120px]' />
            <div onClick={handleClick} className='absolute right-0 top-1 rounded-xl group-hover:opacity-100 sm:opacity-0 bg-2 duration-300'>
                <AddButton className='!border-none !rotate-45 hover:!-rotate-[135deg] hover:!opacity-100 opacity-45' />
            </div>
        </div>
        <div className='w-full bg-[#A0DB9C] h-fit text-ice/80 font-semibold text-[20px] p-5 rounded-2xl text-center '>
            <p>{alarm} minutes till {title}</p>
        </div>
    </div>
  )
}

export default AlarmComponent;
