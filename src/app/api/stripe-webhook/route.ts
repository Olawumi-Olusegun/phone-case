import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";


const resend = new Resend(process.env.RESEND_API_KEY);



export async function POST(request: Request) {

    const body = await request.text();

    const signature = headers().get("Stripe-Signature") as string;

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY as string;

    let event: Stripe.Event;

    console.log({body, signature, webhookSecret})

    if(!signature || !webhookSecret) {
        console.log("No webhookSecret/signature");
        return new Response("Invalid signature", { status: 400 })
    }
    
    try {
    
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

        if(event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;

            if(!session.customer_details) {
                throw new Error("Missing user email")
            }

            const {userId, orderId} = session.metadata || { userId: null, orderId: null };

            if(!userId || !orderId) {
                throw new Error("Invalid request metadata")
            }

            const billingAddress = session.customer_details!.address;
            const shippingAddress = session.shipping_details!.address;

            console.log({message: "about to update order"})

         const updatedOrder = await prismadb.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    isPaid: true,
                    shippingAddress: {
                        create: {
                            name: session.customer_details.name as string,
                            city: shippingAddress?.city as string,
                            country: shippingAddress?.country as string,
                            street: shippingAddress?.line1 as string,
                            postalCode: shippingAddress?.postal_code as string,
                            state: shippingAddress?.state as string,
                        }
                    },
                    billingAddress: {
                        create: {
                            name: session.customer_details.name as string,
                            city: billingAddress?.city as string,
                            country: billingAddress?.country as string,
                            street: billingAddress?.line1 as string,
                            postalCode: billingAddress?.postal_code as string,
                            state: billingAddress?.state as string,
                        }
                    },
                }
            });

            await resend.emails.send({
                from: 'PhoneCase <onboarding@resend.dev>',
                to: [session.customer_details.email as string],
                subject: 'Thanks for your order',
                react: OrderReceivedEmail({
                    orderId, 
                    orderDate: updatedOrder.createdAt.toLocaleDateString(),
                    // @ts-ignore
                    shippingAddress: {
                        name: session.customer_details.name as string,
                        city: shippingAddress?.city as string,
                        country: shippingAddress?.country as string,
                        street: shippingAddress?.line1 as string,
                        postalCode: shippingAddress?.postal_code as string,
                        state: shippingAddress?.state as string,
                    }
                }),
            })
        }

        return NextResponse.json({ result: event, ok: true});
        
    } catch (error) {
        console.log({error})
        return NextResponse.json({ message: "Something went wrong", ok: false});
    }
}