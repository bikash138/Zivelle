import { NextRequest, NextResponse } from "next/server";
import getUserId from "@/lib/getUserId"
import { prisma } from "@repo/database/prisma";
import Razorpay from 'razorpay'

 const razorpayInstance = () =>
  new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

export async function POST(req:NextRequest) {
    try{
        const {userId, error} = await getUserId(req)
        if(error){
            return error
        }
        const body = await req.json()
        const totalAmount = body.totalAmount
        const options = {
            amount: Math.round(Number((+totalAmount).toFixed(2)) * 100),
            currency: "INR",
            receipt: `receipt-${Date.now()}`,
        }
        try{
            //Initiate the payment using Razorpay
            const razorpay = razorpayInstance();
            const paymentResponse = await razorpay.orders.create(options);
            await prisma.order.create({
                data: {
                    total: totalAmount,
                    orderStatus: "Pending", 
                    paymentStatus: "Pending",
                    customerId: userId,
                    razorpayOrderId: paymentResponse.id
                }
            });
            return NextResponse.json({
                success:true,
                data: paymentResponse
            },{status: 200})
        }
        catch(error){
            console.log(error)
            return NextResponse.json({ 
                success: false, message: "Could not initiate order." 
            })
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went while doing payment"
        })
    }
}