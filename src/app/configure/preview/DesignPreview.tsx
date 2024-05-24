"use client";

import Phone from '@/components/Phone';
import { cn } from '@/lib/utils';
import { COLORS, MODELS } from '@/validators/option-validator';
import { Configuration } from '@prisma/client';
import { Check } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Confetti from "react-dom-confetti"

type Props = {
    configuration: Configuration;
}

function DesignPreview({configuration}: Props) {

    const [showConfetti, setShowConfetti] = useState(false);

    const {color, model } = configuration;
    const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw;
    const { label: modelLabel } = MODELS.options.find(({value}) => value === model)!;

    useEffect(() => {
        setShowConfetti(true)
    }, [])

  return (
    <>
    <div className='pointer-events-none absolute inset-0 overflow-hidden flex justify-center'>
        <Confetti active={showConfetti} config={{ elementCount: 200, spread: 90 }} />
    </div>
    <div className="mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm: gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
            <Phone className={cn(`bg-${tw}`)} imgSrc={configuration.croppedImageUrl!}  />
        </div>
        <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
            <h3 className='text-3xl font-bold tracking-tight text-gray-900'>Your {modelLabel} Case </h3>
            <div className="mt-3 flex items-center gap-1.5 text-base ">
                <Check className='h-4 w-4 text-green-500' />
                In stock and ready to ship
            </div>
        </div>
        <div className="sm:col-span-12 md:col-span-9 text-base ">
            <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10 ">
                <div className="">
                    <p className="font-medium text-zinc-950">Highlights</p>
                    <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                        <li>Wireless charging compatible</li>
                        <li>TPU shock absorption</li>
                        <li>TPU shock absorption</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default DesignPreview