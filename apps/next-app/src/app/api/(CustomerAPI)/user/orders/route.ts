import { NextRequest, NextResponse } from "next/server";
import getUserId from "@/lib/getUserId"
import {razorpayInstance} from '@repo/payments/razorpay'

export async function POST(req:NextRequest) {
    try{
        const {userId, error} = await getUserId(req)
        if(error){
            return error
        }
        const { items, totalAmount } = await req.json()
        const options = {
            amount: Math.round(Number((+totalAmount).toFixed(2)) * 100),
            currency: "INR",
            receipt: `receipt-${Date.now()}`,
        }
        console.log(options)
        try{
            //Initiate the payment using Razorpay
            const razorpay = razorpayInstance();
            const paymentResponse = await razorpay.orders.create(options);
            console.log(paymentResponse)
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