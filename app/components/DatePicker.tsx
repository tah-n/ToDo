"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "./lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "./ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import useProps from "./lib/useProps"

export function DatePicker() {
  const taskDate = useProps((state) => state.taskDate);
  const setTaskDate = useProps((state) => state.setTaskDate);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-full justify-center gap-4 !bg-white/0 !border-none text-left font-normal",
            !taskDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon color="#719191" />
          {taskDate === new Date() ? <span>Today</span> : format(taskDate, "PPP")}
        </Button> 
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={taskDate}
          onSelect={(taskDate) => setTaskDate(taskDate)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
