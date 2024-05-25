"use server";

import prismadb from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
    const {getUser} = getKindeServerSession();

    const user = await getUser();

    if(!user || !user.id || !user.email) {
        throw new Error("You need to be logged in");
    }

    const order = await prismadb.order.findFirst({
        where: {
            id: orderId, 
            userId: user.id
        },
        include: {
            billingAddress: true,
            shippingAddress: true,
            configuration: true,
            User: true,
        }
    });

    if(!order) {
        throw new Error("This order does not exist")
    }

    if(order.isPaid) {
        return order;
    } else {
        return false;
    }

}