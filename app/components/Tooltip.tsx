import React from 'react'

type Tooltip = {
    className?: string,
    children: React.ReactNode,
}

const Tooltip:React.FC<Tooltip> = ({className,children}) => {
  return (
    <div className={`${className} absolute z-50 pointer-events-none left-[110%] text-xs w-max text-text p-1 bg-teal transition-opacity opacity-0 group-hover:opacity-100 rounded-sm `}>
        <p>{children}</p>
    </div>
  )
}

export default Tooltip
