'use client'

import React, { useEffect, useState } from 'react'
import useProps from './lib/useProps';
import TaskContainer from './TaskContainer';
import TopMenu from './TopMenu';

interface TaskCardProps {
  title: string;
  date: Date;
  time: string,
  alarm: string,
  cardClassName?: string,
  isCompleted: Boolean,
  id: number;
  notify: boolean
}


const Tasks = () => {
  const chosenMenuItem = useProps(state => state.chosenMenuItem);
  const completedTasks = useProps(state => state.completedTasks);
  const upcoming = useProps(state => state.upcommingTasks)
  const missedTasks = useProps(state => state.missedTasks);
  
  
 useEffect(() => {
  const storedTask = localStorage.getItem('upcoming');
  if(storedTask) {
    const parsedTasks = JSON.parse(storedTask);
    const missedTasks = parsedTasks.filter((t : TaskCardProps) => {
      const now = new Date();
      const taskTime = t.time;
      const[hours,mins] = taskTime.split(':').map(Number);
      const taskDate = new Date(t.date);
      taskDate.setHours(hours,mins,0,0);

      if(taskDate < now){
        useProps.getState().setMissedTasks(t);
        return false;
      } 
      return true;
    })
    useProps.setState({ upcommingTasks: missedTasks});
  }
 },[])


 
 
  return (
    <div className='absolute top-0 left-[70px] sm:left-[100px] w-[100%] h-full'>
      <TopMenu />
      {upcoming && chosenMenuItem === 'upcomming tasks'&& <TaskContainer cardClassName='' className='' array={upcoming} />}
      {chosenMenuItem === 'completed tasks'&& <TaskContainer cardClassName='!pointer-events-none !opacity-80' treeIconClass='opacity-0' array={completedTasks} />}
      {chosenMenuItem === 'missed tasks'&& <TaskContainer cardClassName='!pointer-events-none !opacity-80' treeIconClass='opacity-0' array={missedTasks} />}
    </div>
  )
}

export default Tasks;
