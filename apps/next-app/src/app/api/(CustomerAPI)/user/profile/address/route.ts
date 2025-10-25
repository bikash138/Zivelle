import getUserIdFromRequest from "@/lib/getUserId";
import { prisma } from "@repo/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const {userId, error} = await getUserIdFromRequest(req);

        if(error){
            return error
        }
        const {fullName, phone, street, city, state, postalCode, country} = await req.json()
        await prisma.billingAddress.create({
            data: {
                fullName,
                phone,
                street,
                city,
                state,
                postalCode,
                country,
                customer: {
                    connect: { id: userId },
                },
            },
        })
        return NextResponse.json({
            success:true,
            message: "Address Added Successfully"
        });
    }catch(error){
        console.log(error);
        return NextResponse.json({ 
            message: "Something went wrong while adding address",
            error: error
        });
    }
}

export async function PATCH(req: NextRequest) {
    try{
        const {error} = await getUserIdFromRequest(req)
        if(error){
            return error
        }
        const {id, fullName, phone, street, city, state, postalCode, country} = await req.json()
        if(!id){
            return NextResponse.json({ 
                success: false,
                message: "Address id is Required",
            }); 
        }
        const updatedAddress = await prisma.billingAddress.update({
            where:{
                id: id
            },
            data:{
                fullName, phone, street, city, state, postalCode, country
            }
        })
        return NextResponse.json({ 
            success: true,
            updatedAddress,
            message: "Address updated Successfully"
            
        });
    }catch(error){
        console.log(error);
        return NextResponse.json({ 
            message: "Something went wrong while updating address",
            error: error
        });
    }
}

export async function DELETE(req: NextRequest) {
    try{
        const {error} = await getUserIdFromRequest(req)
        if(error){
            return error
        }
        const {id} = await req.json()
        await prisma.billingAddress.delete({
            where:{
                id: id
            }
        })
        return NextResponse.json({ 
            success: true,
            message: "Address deleted Successfully"
        });
    }catch(error){
        console.log(error);
        return NextResponse.json({ 
            message: "Something went wrong while deleting address",
            error: error
        });
    }
}