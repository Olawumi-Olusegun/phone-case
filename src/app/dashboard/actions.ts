"use server";

import prismadb from "@/lib/prismadb";
import { OrderStatus } from "@prisma/client";

export const changeOrderStatus = async ({id, newStatus}: {id: string, newStatus: OrderStatus}) => {

     await prismadb.order.update({
        where:{
            id
        },
        data: {
            status: newStatus
        }
    });
}