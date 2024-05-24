
import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
    dark?: boolean;
}

function Phone({className, imgSrc, dark = false, ...props}: PhoneProps) {
  return (
    <div className={cn("relative z-50 overflow-hidden", className)} {...props}>
        <img
        src={dark ? "/phone-template-dark-edges.png" : "/phone-template-white-edges.png" }
        alt="phone image"
        className='pointer-events-none z-50 '
        />
        <div className="absolute -z-10 inset-0">
            <img src={imgSrc} alt="overlaying-phone" className='object-cover min-w-full min-h-full pointer-events-none' />
        </div>
    </div>
  )
}

export default Phone