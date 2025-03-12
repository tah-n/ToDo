import React from 'react'
import { Plus } from './ui/Plus'

type ButtonProps = {
    className?: string,
    children?: React.ReactNode,
    click?: () => void,
    plusClassName?: string
}

const AddButton: React.FC<ButtonProps> = ({className ,click,plusClassName}) => {
  return (
    <button className={`${className} relative group border-[3px] border-ice w-[50px] h-[50px] flex items-center justify-center pt-[2px] rounded-full cursor-pointer duration-500 transition-all ease-in-out hover:-rotate-90 hover:scale-90 `} onClick={click}>
      <Plus className={plusClassName} />
    </button>

  )
}

export default AddButton
