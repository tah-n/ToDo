"use client";

import { Clock, Bell } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/Select';
import { Card } from "./ui/Card";
import useProps from "./lib/useProps";

const REMINDER_OPTIONS = [
  { value: "10", label: "10 minutes before" },
  { value: "20", label: "20 minutes before" },
  { value: "30", label: "30 minutes before" },
  { value: "60", label: "1 hour before" },
];

export function AlarmSelector() {
  const alarmTime = useProps((state) => state.alarmTime);
  const setAlarmTime = useProps((state) => state.setAlarmTime);


  return (
    <Card className="w-full h-full md:w-[60%] ">
        <div className="w-full">
          <Select onValueChange={setAlarmTime} value={alarmTime}>
            <SelectTrigger className="w-full">
              <Clock className="" color="#719191" />  
              <SelectValue className="text-text-1" placeholder="Select reminder time" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Reminder Options</SelectLabel>
                {REMINDER_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
    </Card>
  );
}