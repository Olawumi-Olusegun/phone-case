
import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import appConstants from '@/constants';

type Props = {}

async function Navbar({}: Props) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    const isAdmin = user?.email === appConstants.ADMIN_EMAIL;

  return (
    <header className='sticky z-[100] h-14 inset-x-0 top-0 w-full bg-white/75 backdrop-blur-lg transition-all  border-b'>
        <nav className='w-full'>
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b">
                    <Link href={"/"} className='flex items-center z-40 font-semibold'>
                        Phone<span className='text-green-600'>Case</span>
                    </Link>
                    <div className="h-full flex items-center space-x-2 text-base ">
                        {
                        user ? (
                                <>
                                    <Link href={"/api/auth/logout"} className={buttonVariants({size:"sm", variant: "ghost"})}>Logout</Link>
                                    {
                                        isAdmin 
                                        ? (
                                            <Link href={"/dashboard"} className={buttonVariants({size:"sm", variant: "ghost"})}>Dashboard</Link>
                                        )
                                        : null
                                    }
                                    <Link href={"/configure/upload"} className={buttonVariants({ size:"sm", variant: "ghost", className: "hidden sm:flex items-center gap-1 bg-primary text-white transition-all duration-300" })}>Create Case <ArrowRight className='h-4 w-4' /> </Link>
                                </>
                                )
                             : (
                                <>
                                    <Link href={"/api/auth/register"} className={buttonVariants({size:"sm", variant: "ghost"})}>Logout</Link>
                                    <Link href={"/api/auth/login"} className={buttonVariants({ size:"sm", variant: "ghost", className: "sm:flex items-center gap-1 transition-all duration-300" })}>Login</Link>
                                    <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
                                    <Link href={"/configure/upload"} className={buttonVariants({ size:"sm", variant: "ghost", className: "hidden sm:flex items-center gap-1 bg-primary text-white transition-all duration-300" })}>Create Case <ArrowRight className='h-4 w-4' /> </Link>
                                </>
                            
                            ) 
                    }
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    </header>
  )
}

export default Navbar