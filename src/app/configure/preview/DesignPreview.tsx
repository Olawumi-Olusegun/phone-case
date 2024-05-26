"use client";

import Phone from '@/components/Phone';
import { Button } from '@/components/ui/button';
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/product';
import { formatPrice } from '@/lib/formatPrice';
import { cn } from '@/lib/utils';
import { COLORS, MODELS } from '@/validators/option-validator';
import { Configuration } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight, Check } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Confetti from "react-dom-confetti"
import { createCheckoutSession } from './actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import LoginModal from '@/components/LoginModal';


type Props = {
    configuration: Configuration;
}

function DesignPreview({configuration}: Props) {

    const [showConfetti, setShowConfetti] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const {color, model, finish, material } = configuration;
    const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw;
    const { label: modelLabel } = MODELS.options.find(({value}) => value === model)!;

    const {user, isLoading } = useKindeBrowserClient()

    const router = useRouter();

    const {mutate: createCheckoutSessionMutation} = useMutation({
        mutationKey: ["get-checkout-session"],
        mutationFn: createCheckoutSession,
        onError: (error) => {
            return toast.error("Something went wrong", {
                description: "Payment could not be made from your end"
            })
        },
        onSuccess: ({url}) => {
            if(url) {
                router.push(url)
            }else {
                throw new Error("Unable to retrieve payment url")
            }
        }
    });

    let totalPrice = BASE_PRICE;

    if(material === "polycarbonate") {
        totalPrice += PRODUCT_PRICES.material.polycarbonate
    } 

    if(finish === "textured") {
        totalPrice += PRODUCT_PRICES.finish.textured
    }

 
    const handleCheckout = () => {

        if(user) {
            console.log("DesignPreview [USER]::: ", user)
            createCheckoutSessionMutation({configId: configuration.id})
        } else {
            localStorage.setItem("configurationId", configuration.id);
            setLoginModalOpen(true)
        }
    }

    useEffect(() => {
        setShowConfetti(true)
    }, [])

  return (
    <>
    <div className='pointer-events-none absolute inset-0 overflow-hidden flex justify-center'>
        <Confetti active={showConfetti} config={{ elementCount: 200, spread: 90 }} />
    </div>
    <LoginModal isOpen={loginModalOpen} setIsOpen={setLoginModalOpen} />
    <div className="my-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm: gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className=" md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
            <Phone className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full ")} imgSrc={configuration.croppedImageUrl!}  />
        </div>
        <div className="mt-6 sm:col-span-9  md:row-end-1">
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
                        <li>Packaging made from recycled materials </li>
                        <li>5 years print warranty</li>
                    </ol>
                </div>
                <div className="">
                    <p className='font-medium text-zinc-950'>Materials</p>
                    <ol className="mt-3 text-zinc-700 list-disc list-inside">
                        <li>High-quality, duration materials</li>
                        <li>Scratch and finger printresistant coating</li>
                    </ol>
                </div>
            </div>
            <div className="mt-8">
                <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8 ">
                    <div className="flow-root text-sm ">
                        <div className="flex items-center justify-between py-1 mt-2">
                            <p className="text-gray-600">Base Price</p>
                            <p className="text-gray-900 font-medium">{formatPrice(BASE_PRICE/100)}</p>
                        </div>
                        
                        {finish === "textured" ? (
                        <div className="flex items-center justify-between py-1 mt-2">
                            <p className="text-gray-600">Textured Finished</p>
                            <p className="text-gray-900 font-medium">{formatPrice(PRODUCT_PRICES.finish.textured /100)}</p>
                        </div> 
                        ) : null }

                        {material === "polycarbonate" ? (
                        <div className="flex items-center justify-between py-1 mt-2">
                            <p className="text-gray-600">Soft polycarbonate material</p>
                            <p className="text-gray-900 font-medium">{formatPrice(PRODUCT_PRICES.material.polycarbonate /100)}</p>
                        </div> 
                        ) : null }
                        <div className='my-2 h-px bg-gray-200' />
                        <div className="flex items-center justify-between py-2">
                            <p className="font-semibold text-gray-900">Order Total</p>
                            <p className="font-semibold text-gray-900 ">
                                {formatPrice(totalPrice / 100)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-end pb-12">
                    <Button onClick={handleCheckout} className='px-4 sm:px-6 lg:px-8 group'>
                        Check out <ArrowRight className="h-4 w-4 inline group-hover:pr-1 duration-300" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default DesignPreview