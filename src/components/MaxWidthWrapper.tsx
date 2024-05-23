
import React, { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils';


interface MaxWidthWrapperProps extends HTMLAttributes<HTMLDivElement>{}

function MaxWidthWrapper({children, className, ...props}: MaxWidthWrapperProps) {
  return (
    <div className={cn("h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className)} {...props}>
        {children}
    </div>
  )
}

export default MaxWidthWrapper