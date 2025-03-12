'use client'
import React, { useEffect } from 'react'
import Background from './Background';
import Dashboard from './Dashboard';
import Line from './Line';
import AddNewTask from './AddNewTask';
import { ToastContainer, toast } from 'react-toastify';
import useProps from './lib/useProps';
import Backdrop from './ui/Backdrop';
import EditTask from './EditTask';
import AlarmComponent from './AlarmComponent';

type Task = {
  id: number,
  title: string,
  date: Date,
  time: string,
  alarm: string,
  isCompleted: Boolean,
  notify: Boolean
}



const Heading = () => {
  const displayCard = useProps(state => state.displayCard);
  const setDisplayCard = useProps((state) => state.setDisplayCard);
  const displayEdit = useProps(state => state.displayEdit);
  const setDisplayEdit = useProps((state) => state.setDisplayEdit);
  const {alarmIcon,setAlarmIcon,alarmTitle,alarmMin} = useProps();


  const playAlarmSound = () => {
    const audio = new Audio('assets/notification/notification.mp3');
    audio.play();
  }
  
  
 

  const setUpAlarms = () => {
      const upcoming = localStorage.getItem('upcoming');
      const allTasks = upcoming? JSON.parse(upcoming) : [];
      const today = new Date();
     
    allTasks.forEach((task: Task) => {
      const date = new Date(task.date);
      const time = task.time;
      const[taskHour,taskMin]= time.split(':').map(Number);
      date.setHours(taskHour,taskMin);
      const alarmTime = Number(task.alarm);


  
      const realAlarmTime = new Date(date.getTime() - alarmTime * 60 * 1000);

      if(realAlarmTime.getTime() <= today.getTime() && realAlarmTime.getTime() + 12000 > today.getTime()) {
        setAlarmIcon(true);
        playAlarmSound();
        const updatedTask = {...task, notify: true}
        useProps.getState().setEditedTasks(updatedTask);
        useProps.getState().setAlarmTitle(task.title);
        useProps.getState().setAlarmMin(task.alarm);

      }

    })

  }

  useEffect(() => {

    const interval = setInterval(() => {
      setUpAlarms()
    },6000)
    

    return () => {
      clearInterval(interval);
    }
  },[])

  return (
    <section className='relative w-full h-full flex items-center justify-center overflow-hidden'>
        <Background />
        <Line />

        <Dashboard />
        {displayCard &&
        <>
          <AddNewTask />
          <Backdrop onClick={() => setDisplayCard(false)} />
        </> 
        }

        {displayEdit && 
        <>
          <EditTask />
          <Backdrop onClick={() => setDisplayEdit(false)} />
        </>
        }
        
        {alarmIcon && 
        <AlarmComponent title={alarmTitle} alarm={alarmMin} className={`opacity-0 ${alarmIcon && 'opacity-100'} transition-opacity ease-in-out duration-100`} />
        }
        
        <ToastContainer closeOnClick={true} theme='colored' position='bottom-right' autoClose={3000} />
    </section>
  )
}

export default Heading;
