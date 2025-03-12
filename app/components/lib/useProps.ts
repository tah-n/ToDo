'use client'

import { create } from 'zustand';

interface Task {
  id: number;
  title: string;
  date: Date,
  time: string,
  alarm: string,
  notify: Boolean;
  isCompleted: Boolean,
}

interface PropsState {
  newTask: string,
  setNewTask: (newTask: string) => void;
  taskDate: Date;
  setTaskDate: (newDate: Date | undefined) => void;
  taskTime: string;
  setTaskTime: (newTime: string) => void;
  alarmTime: string,
  setAlarmTime: (newAlarm: string) => void;
  newTaskInfo: {
    title: string,
    date: Date,
    time: string,
    alarm: string,
    isCompleted: any
  };
  setNewTaskInfo: (newTitle: string, newDate: Date, newTime: string, newAlarm: string) => void,
  displayCard: Boolean;
  setDisplayCard: (display: Boolean) => void;
  upcommingTasks: Task[];
  setUpcommingTasks: (task :Task[]) => void;
  addedTasks: Task[];
  setAddedTasks: (addTask: Task) => void;
  completed: Boolean;
  setCompleted: (isCompleted: Boolean) => void;
  chosenMenuItem: string;
  setChosenMenuItem: (item:string) => void;
  completedTasks: Task[];
  setCompletedTasks: (checkedTask: Task) => void; 
  filterTasks: (taskArray: Task[]) => Task[];
  markTaskAsCompleted: (taskTitle: string) => void;
  deleteTask: (taskTitle: string) => void;
  deletedtasks: Task[];
  setDeletedTasks: (task: Task) => void;
  editTask: (task: Task) => void;
  displayEdit: Boolean,
  setDisplayEdit: (isShown: Boolean) => void;
  id: number;
  setId: (newId: number) => void;
  editedTasks: Task[];
  setEditedTasks: (task: Task) => void;
  missedTasks: Task[];
  setMissedTasks: (task: Task) => void;
  changeIcon: Boolean,
  setChangeIcon: (icon: Boolean) => void;
  alarmIcon: boolean;
  setAlarmIcon: (isShow: boolean) => void;
  alarmTitle: string;
  setAlarmTitle: (newTitle: string) => void;
  alarmMin: string | number;
  setAlarmMin: (newMin: string | number) => void;
}



const useProps= create<PropsState>((set, get) => ({
  id: 0,
  setId: (newId) => set({ id: newId }),
  newTask: '',
  setNewTask: (newTask) => set({ newTask }),
  taskDate: new Date(),
  setTaskDate: (newDate) => set({ taskDate: newDate }), 
  taskTime: '12:00',
  setTaskTime: (newTime) => set({ taskTime: newTime }),
  alarmTime: '',
  setAlarmTime: (newAlarm) => set({ alarmTime: newAlarm }),
  newTaskInfo: { 
    title: '', 
    date: new Date, 
    time: '', 
    alarm: '',
    isCompleted: false
  },
  setNewTaskInfo: (newTitle, newDate, newTime, newAlarm) => set((state) => ({ newTaskInfo: { ...state.newTaskInfo, title: newTitle, date: newDate, time: newTime, alarm: newAlarm } })),
  displayCard: false,
  setDisplayCard: (display) => set({ displayCard: display}),
  addedTasks: [],
  setAddedTasks: (addTask) => set((state) => ({ addedTasks: [...state.addedTasks, addTask]})),
  upcommingTasks: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('upcoming')!) || [] : [],

  filterTasks: (taskArray: Task[]) => {
    const updatedTasks = taskArray.filter((task) => {
      const taskDate = new Date(task.date); 
      const month = taskDate.getUTCMonth() + 1;
      const day = taskDate.getUTCDate();
      const date = new Date();
      const currentMonth = date.getUTCMonth() + 1; 
      const currentDay = date.getUTCDay(); 

      if (month < currentMonth) {
        return false;
      } else if (month === currentMonth && day < currentDay) {
        return false;
      } else {
        return true;
      }
    });

    return updatedTasks;
  },


  setUpcommingTasks: (tasks) => set((state) => {
    const newTasks = tasks.filter(task => 
      !state.upcommingTasks.some(t => t.title === task.title)
    );
    if (newTasks.length > 0) {
     const combinedTasks = [...state.upcommingTasks, ...newTasks];
     const updatedUpcommingTasks = get().filterTasks(combinedTasks);
     updatedUpcommingTasks.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate());  // Ensure sorted
      
     const finalupdate = updatedUpcommingTasks.filter((t) => {
      if(state.completedTasks) {
        return !state.completedTasks.some(task => task.title === t.title);
        } 
        return true;
    })

    const updatedeletedItems = finalupdate.filter((t) => {
      if(state.deletedtasks) {
        return !state.deletedtasks.some(task => task.title === t.title);
      }
      return true;
    })

    const editedItems = updatedeletedItems.filter(t => {
      if(state.editedTasks) {
        return !state.editedTasks.some(task => task.title === t.title);
      }
    })

    const missedTasks = editedItems.filter(t => {
      const now = new Date();
      const taskTime = t.time;
      const[hours,mins] = taskTime.split(':').map(Number);
      const taskDate = new Date(t.date);
      taskDate.setHours(hours,mins,0,0);

      if(taskDate < now){
        state.setMissedTasks(t);
        return false;
      } 
      return true;
    })
      localStorage.setItem('upcoming', JSON.stringify(missedTasks));
      localStorage.removeItem('deleted');
      
      return { upcommingTasks: missedTasks };  // Replace the entire array
    }
    return state;
    }),
  completed: false,
  setCompleted: (isCompleted) => set({ completed: isCompleted }),
  chosenMenuItem: 'upcomming tasks',
  setChosenMenuItem: (item) => set({ chosenMenuItem: item}),
  completedTasks: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('completed')!) || [] : [],
  setCompletedTasks: (checkedTask) => set((state) => {
    if(!state.completedTasks.some(t => t.title === checkedTask.title)) {
      const updatedCompletedTasks = [...state.completedTasks, checkedTask] 
      localStorage.setItem('completed', JSON.stringify(updatedCompletedTasks));
      return { completedTasks: updatedCompletedTasks }
    } 
    return state;
  }),
  markTaskAsCompleted: (taskTitle: string) => set((state) => {
    // Filter out the task from upcommingTasks
    const remainingTasks = state.upcommingTasks.filter(task => task.title !== taskTitle);
    // Find the task to move
    const completedTask = state.upcommingTasks.find(task => task.title === taskTitle);
    
    if (completedTask) {
      const updatedCompletedTasks = [...state.completedTasks, completedTask];
      localStorage.setItem('upcoming', JSON.stringify(remainingTasks));
      localStorage.setItem('completed', JSON.stringify(updatedCompletedTasks));
  
      return {
        upcommingTasks: remainingTasks,
        completedTasks: updatedCompletedTasks,
      };
    }
    return state;
  }),

  deletedtasks: typeof window  !== 'undefined'? JSON.parse(localStorage.getItem('deleted')!) || [] : [],
  setDeletedTasks: (task) => set((state) => {
    if(!state.deletedtasks.some(t => t.title === task.title)) {
      const updatedDeletedTasks = [...state.deletedtasks, task]
      localStorage.setItem('deleted', JSON.stringify(updatedDeletedTasks));
      return { deletedtasks: updatedDeletedTasks}
    }
    return state
  }),

  deleteTask: (tasktitle) => set((state) => {
    const updatedUpcomingTasks = state.upcommingTasks.filter(t => t.title !== tasktitle);
    const deleteTask = state.upcommingTasks.find(t => t.title === tasktitle);
    if(deleteTask) {
      localStorage.setItem('upcoming', JSON.stringify(updatedUpcomingTasks));
      state.setDeletedTasks(deleteTask);
    }
    return { upcommingTasks: updatedUpcomingTasks }
  }),
  editedTasks: typeof window !== 'undefined'? JSON.parse(localStorage.getItem('edited')!) || [] : [],
  setEditedTasks: (task) => set((state) => {
    if(!state.editedTasks.find(t => t.id === task.id)) {
      const updatedEditedTasks = [...state.editedTasks, task];
      localStorage.setItem('edited',JSON.stringify(updatedEditedTasks));
      return { editedTasks: updatedEditedTasks }
    }
    return state
  }),
  editTask: (task) => set((state) => {
    const editTask = state.upcommingTasks.map((t) => t.id === task.id? task : t )
    const editedItem = state.upcommingTasks.find(t => t.id === task.id);
    if(editedItem) {
      state.setEditedTasks(editedItem);
    }
    const missedTasks = editTask.filter(t => {
      const now = new Date();
      const taskTime = t.time;
      const[hours,mins] = taskTime.split(':').map(Number);
      const taskDate = new Date(t.date);
      taskDate.setHours(hours,mins,0,0);

      if(taskDate < now){
        state.setMissedTasks(t);
        return false;
      } 
      return true;
    })
    localStorage.setItem('upcoming',JSON.stringify(missedTasks));
    return { upcommingTasks: missedTasks }
  }),

  displayEdit: false,
  setDisplayEdit: (isShown) => set({ displayEdit: isShown}),
  missedTasks: typeof window !== 'undefined'? JSON.parse(localStorage.getItem('missed')!) || []: [],
  setMissedTasks: (task) => set((state) => {
    const { completedTasks, missedTasks } = get();
    if(!missedTasks.some(t => t.id === task.id)) {
      const updatedMissedTasks = [...state.missedTasks, task];
      const newUpdate = updatedMissedTasks.filter((t) => {
        if(completedTasks) {
          return !completedTasks.some(ctask => ctask.id === t.id)
        }
        return true
      })
      localStorage.setItem('missed', JSON.stringify(newUpdate));
      return { missedTasks: newUpdate }
    }
    return state
  }),
  changeIcon: false,
  setChangeIcon: (icon) => set({ changeIcon: icon }),
  alarmIcon: false,
  setAlarmIcon: (isShow) => set({ alarmIcon: isShow }),
  alarmTitle: '',
  setAlarmTitle: (title) => set({ alarmTitle: title }),
  alarmMin: '',
  setAlarmMin: (min) => set({ alarmMin: min }),

}))

export default useProps;




