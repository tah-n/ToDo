"use client";

import { MoreVertical, Bell, Calendar, CheckIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "./ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Checkbox } from "radix-ui";
import { useEffect, useState } from "react";
import useProps from "./lib/useProps";

interface TaskCardProps {
  title: string;
  date: Date;
  time: string,
  alarm: string,
  cardClassName?: string,
  isCompleted: Boolean,
  id: number;
  treeIconClass?: string;
}

const colors = [
  'bg-1',
  'bg-2',
  'bg-3',
  'bg-4',
  'bg-5',
  'bg-6',
  'bg-7',
];
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
  }

  const srcIcons = [
    "assets/little tree/proud.gif",
    "assets/little tree/shy.gif",
    "assets/little tree/sleep (2).gif",
    "assets/little tree/frustrated.gif",
    "assets/little tree/depressed.gif",
    "assets/little tree/dead (2).gif",
  ]



export function TaskCard({ title, date, time, alarm,cardClassName,isCompleted,id, treeIconClass}: TaskCardProps) {
  const [checked,setChecked] = useState(false);
  const [randomBg,setRandomBg] = useState<string>('bg-1');
  const dateSpan = new Date(date);
  const completedTasks = useProps(state => state.completedTasks);
  const setNewTask = useProps((state) => state.setNewTask);
  const setTaskTime = useProps((state) => state.setTaskTime);
  const setTaskDate = useProps((state) => state.setTaskDate);
  const setAlarmTime = useProps((state) => state.setAlarmTime);
  const changeIcon = useProps((state) => state.changeIcon);
  const setChangeIcon = useProps((state) => state.setChangeIcon);
  const[src,setSrc] = useState(srcIcons[0]);

  // Format the date
  const formattedDate = dateSpan.toLocaleDateString('en-US', {
    weekday: 'short', // "Fri"
    day: '2-digit',   // "07"
    month: 'short',   // "Mar"
  });

  



  useEffect(() => {
    setRandomBg(getRandomColor);
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1);
      if(idx < srcIcons.length) {
        setSrc(srcIcons[idx]);
      } else {
        idx = -1;
      }
    },300000)


    return () => {
      clearInterval(interval);
    }
  },[])


  const handleChecked = () => {
    setChecked(true)
    useProps.getState().markTaskAsCompleted(title);
    
  }

  const handleEdit = () => {
    useProps.getState().setDisplayEdit(true);
    useProps.getState().setId(id)
    setNewTask(title);
    setTaskDate(date);
    setTaskTime(time);
    setAlarmTime(alarm);

  }

  const handleDelete = () => {
    useProps.getState().deleteTask(title);
  }

  return (
    <Card className={`${cardClassName} group relative -z-0 bg-white/90 font-display !border-none text-text-1 rounded-[2rem] min-w-[260px] min-h-[190px] h-fit w-full md:w-full overflow-hidden transition-all`}>
      <CardHeader className="relative -z-10 flex flex-row items-center justify-between">
          <div className="w-[90%] min-h-[60px] h-fit mb-1 flex flex-wrap gap-4 overflow-hidden">
            <h3 className="font-semibold capitalize text-[16px] w-[85%]">{title}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="opacity-100 sm:opacity-0 mb-8 group-hover:opacity-100">
              <MoreVertical color="#243036" className="h-5 w-5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/90">
              <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

      </CardHeader>
      <CardContent className="relative -z-10">
        <div className="w-full flex items-end justify-between text-sm text-muted-foreground">
          <div className="w-full">
            <div className="flex items-center gap-2 mb-2">
              <Calendar color="#719191" className="h-4 w-4" />
              <span className="text-text-1/70">
                {formattedDate}
              </span>
              <span className="text-text-1/70">{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell color="#719191" className="h-4 w-4" />
              <span className="text-text-1/70">{alarm}</span>
              <span className="text-text-1/70 text-xs">mins</span>
            </div>
            </div>
          <div>
            <Checkbox.Root  checked={completedTasks.some((t) => t.title === title)} onClick={() => handleChecked()} className={`${checked && 'opacity-70'} relative cursor-pointer bg-teal opacity-70 transition-opacity ease-in-out duration-100 flex items-center justify-center border-ice shadow-md rounded-full p-2 w-[65px] h-[50px]`}>
              <div className={`${treeIconClass} absolute ${src === "assets/little tree/proud.gif"? '-top-[54px]': '-top-[48px]'}`}>     
                <img width={65} alt="tree" src={src} /> 
              </div>
              <Checkbox.Indicator />
              {completedTasks.some((t) => t.title === title) && <CheckIcon color="#f2fdff" size={50}  />}
            </Checkbox.Root>
          </div>
        </div>
        {/* bar */}
        <div>

        </div>

      </CardContent>

       {/* leafs */}
       <div className="absolute -z-20 w-full h-full top-0 left-0">
          <div className="relative w-full h-full ">
            <img src="assets/icons/leaf 2.png" width={150} className="absolute rotate-180 opacity-20 -top-16 -right-10" />
            <img src="assets/icons/leaf 5.png" width={250} className="absolute -rotate-45 opacity-5 -left-32 -top-8 " />
          </div>
        </div>
    </Card>
  );
}