'use Client'
import React from 'react'
import { TaskCard } from './TaskCard'

interface Tasks {
  id: number
  title: string;
  time: string;
  date: Date;
  alarm: string;
  isCompleted: any;
}

interface TasksType {
    className?: string;
    cardClassName?: string;
    cardContainer?: string;
    array: Tasks[];
    treeIconClass?: string;

}



const TaskContainer = ({className, cardClassName,cardContainer,array,treeIconClass}: TasksType) => {
  return (
    <div className={`${className} relative sm:w-[96%] md:w-[85%] w-[98%] h-full border-r border-teal/30`}>
      <div className='no-scrollbar w-full h-[100vh] sm:h-[610px] pt-10 pb-8 overflow-y-auto scroll-smooth'>
        <div className={`${cardContainer} w-full grid grid-cols-1 gap-3 p-2 pr-20 md:pr-4 sm:grid-cols-2 xl:grid-cols-3`}>
          {array && array.map((task: Tasks, i) => (
            <TaskCard key={i} cardClassName={cardClassName} title={task.title} time={task.time} alarm={task.alarm} date={task.date} isCompleted={task.isCompleted} id={task.id} treeIconClass={treeIconClass} />
          ))}
        </div>
      </div>  
      
    </div>
      
  )
}

export default TaskContainer
