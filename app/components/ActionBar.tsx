import React, { useEffect } from 'react'
import AddButton from './AddButton';
import Tooltip from './Tooltip';
import useProps from './lib/useProps';

const ActionBar = () => {
  const setDisplayCard = useProps((state) => state.setDisplayCard);
  const{setNewTask,setTaskDate,setAlarmTime,setTaskTime} = useProps();

  const handleDisplay = () => {
    setDisplayCard(true);
    setNewTask('');
    setTaskDate(new Date());
    setAlarmTime('');
    setTaskTime('12:00');
  }
  return (
    <div className='relative z-10 w-[70px] sm:w-[100px] h-full flex flex-col items-center border-[2px] bg-teal/80 backdrop-blur-md sm:rounded-tl-[2.3rem] sm:rounded-bl-[2.3rem] border-teal/50  shadow-2xl'>
      {/* add action buttons */}
      <div className='relative mt-20 z-20 group w-min h-fit'>
        <AddButton click={handleDisplay} className='m-auto' />
        <Tooltip className='-translate-y-10'>
            Add New Task
        </Tooltip>   
      </div>

      <div className='absolute -z-10 top-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='relative w-full h-full'>
          <img src='assets/icons/Polypodium.png' width={100} className='absolute opacity-40 -bottom-1 -left-4 rotate-45' />
          <img src='assets/icons/Polypodium.png' width={100} className='absolute opacity-40 -right-7 bottom-20 -rotate-45' />
          <img src='assets/icons/Polypodium.png' width={100} className='absolute opacity-40 -left-9 bottom-40 rotate-90' />
          <img src='assets/icons/Polypodium.png' width={100} className='absolute opacity-40 -top-1 -left-4 -rotate-[195deg]' />
        </div>

      </div>
    </div>
  )
}

export default ActionBar;
