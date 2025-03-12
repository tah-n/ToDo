'use client'
import React, { useEffect } from 'react'
import Button from './ui/Button';
import useProps from './lib/useProps';
import { DatePicker } from './DatePicker';
import { AlarmSelector } from './AlarmSelector';
import { toast } from 'react-toastify';
import { gsap } from 'gsap/dist/gsap';
import { useGSAP } from '@gsap/react';


interface Task {
  title: string,
  date: Date,
  time: '',
  alarm: '',
  notify: Boolean
}

const AddNewTask = () => {
    const newTask = useProps((state) => state.newTask);
    const setNewTask = useProps((state) => state.setNewTask);
    const taskTime = useProps((state) => state.taskTime);
    const setTaskTime = useProps((state) => state.setTaskTime);
    const taskDate = useProps((state) => state.taskDate);
    const setTaskDate = useProps((state) => state.setTaskDate);
    const alarmTime = useProps((state) => state.alarmTime);
    const setAlarmTime = useProps((state) => state.setAlarmTime);
    const setNewTaskInfo = useProps((state) => state.setNewTaskInfo);
    const setDisplayCard = useProps((state) => state.setDisplayCard);
    const displayCard = useProps((state) => state.displayCard);
    const setUpcommingTasks = useProps(state => state.setUpcommingTasks);


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setNewTask(e.target.value);
    }


    const handleSetTime = (e : React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setTaskTime(e.target.value);

    }


    const handleSubmit = () => {
      if(newTask && taskDate) {
        setNewTaskInfo(newTask,taskDate,taskTime,alarmTime);

        const taskData = {
          id: crypto.randomUUID(),
          title: newTask,
          date: taskDate,
          time: taskTime,
          alarm: alarmTime,
          isCompleted: false,
          notify: false,
        }

        const savedTasks = localStorage.getItem('tasks');
        const taskArray = savedTasks ? JSON.parse(savedTasks): [];
        taskArray.push(taskData);
        const sortedArray = [...taskArray].sort((a: Task,b: Task) => {
          const dateA = new Date(a.date).getTime(); 
          const dateB = new Date(b.date).getTime();
          
          return dateA - dateB;

        }) 
        localStorage.setItem('tasks',JSON.stringify(sortedArray));
        const saved = localStorage.getItem('tasks');
        const array = saved? JSON.parse(saved) : [];
        setUpcommingTasks(array);
        toast.success('New Task was added.');
        setDisplayCard(false);
        setNewTask('');
        setTaskTime('12:00');  
        setTaskDate(new Date());
        setAlarmTime('');

      } else {
        toast.warning('Oh Snap, you forgot the task title.')
      }

    }


    const handleCancel = () => {
      setNewTaskInfo('', new Date(), '', '');
      setDisplayCard(false);
    }

    useGSAP(() => {
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline();

        timeline.to('#newTask', {
          duration: 0.4,
          scale: 1,
          opacity: 1,
          ease: 'power2.in',
        })

      })

      return () => ctx.revert();
    },[displayCard,setDisplayCard])

  
    

  return (
    <div id='newTask' className={`absolute scale-0 opacity-0 z-50 bg-white p-4 text-text-1 border border-teal/40 w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] h-fit rounded-3xl flex flex-col items-center justify-center overflow-hidden`}>
      <div className='w-full mt-2'>
        <div className='w-full flex items-center justify-start gap-4'>
            <div className=''>
                <img src='assets/little tree/dance (3).gif' width={100} alt='tree' />
            </div>
            <h1 className='text-4xl font-bold'>
                Add Task
            </h1>
        </div>
        <textarea value={newTask} onChange={(e) => handleChange(e)} placeholder='Add a new task' className='outline-none resize-none focus:outline-none p-2 border-[1.2px] w-full border-teal/70 rounded-2xl h-[120px]' />

      </div>


        {/* time */}
      <div className='w-full mt-7 flex gap-2 h-[40px] my-4'>
        {/* calendar */}
        <div className='bg-teal/10 cursor-pointer rounded-lg min-w-[130px] w-fit px-1 hover:bg-teal/30 active:bg-teal/60 flex items-center gap-4 justify-center capitalize text-center h-full'>
            <DatePicker />
        </div>
        {/* time */}
        <div className='relative bg-teal/10 cursor-pointer rounded-lg min-w-[140px] w-fit flex items-center gap-4 justify-center hover:bg-teal/30 active:bg-teal/60  capitalize text-center h-full'>
               <input value={taskTime} onChange={(e) => handleSetTime(e)} type='time' color='#719191' className='outline-none opacity-70 focus:opacity-80 appearance-none rounded-sm focus:outline-none ' />
        </div>
      </div>

      <div className='w-full flex h-fit items-center justify-start cursor-pointer text-[#243036]/90'>
        {/* alarm */}
        <AlarmSelector />
      </div>

      {/* submit button and cancel */}
      <div className='w-full flex items-center justify-end gap-3 my-4'>
        <Button onClick={handleCancel} type='cancel'>
            cancel
        </Button>

        <Button onClick={handleSubmit} type='submit'>
            Add
        </Button>
      </div>
      
      <div className='absolute top-0 w-full h-full -z-20'>
        <img src='assets/icons/Leaf 2.png' width={100} alt='leaf' className='absolute -bottom-12 opacity-25 -left-12 rotate-45 -z-10' />
        <img src='assets/icons/Split Leaf.png' width={150} alt='leaf' className='absolute -rotate-90 -top-1 -right-4 opacity-10 -z-10' />
      </div>

    
    </div>
  )
}

export default AddNewTask;
