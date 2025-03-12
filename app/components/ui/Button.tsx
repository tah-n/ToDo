import React from 'react'

type Button = {
    className?: string,
    children: React.ReactNode,
    onClick?: () => void,
    type: 'submit' | 'cancel'
}

const Button: React.FC<Button> = ({className,children,onClick,type}) => {
    const classes = 'w-max h-max cursor-pointer capitalize min-w-[90px] min-h-[45px] rounded-full';

    const buttonTypes = {
        'submit' : 'bg-teal text-white hover:bg-teal/90',
        'cancel' : 'bg-white text-text-1 border-[2px] border-teal hover:bg-teal/10',
    }   



  return (
    <button className={`${classes} ${className} ${buttonTypes[type] || ''}`}
    onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
