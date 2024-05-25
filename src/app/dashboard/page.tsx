import prismadb from '@/lib/prismadb';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

async function DashboardPage({}: Props) {

    const {getUser} = getKindeServerSession();

    const user = await getUser();

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;


    if(!user || user.email !== ADMIN_EMAIL) {
        return redirect("/")
    }

    const orders = await prismadb.order.findMany({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() -7 ))
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            User: true,
            shippingAddress: true,
        },
    });

    const lastWeekSum = await prismadb.order.aggregate({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() -7 ))
            }
        },
        _sum: {
            amount: true,
        }
    });

  return (
    <div className='flex min-h-screen w-full bg-muted/40'>
        
    </div>
  )
}

export default DashboardPage