import { prisma } from "@repo/database/prisma"
import { NextResponse } from "next/server"

export async function GET(){
    try{
        const userId = '7897a286-164c-4766-b031-74498767fbc4'
        const allListedItems = await prisma.item.findMany({
            where:{
                adminId: userId
            },
        })
        return NextResponse.json({
            success: true,
            message: "All listed items fetched",
            allListedItems
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message: "Internal Server Error",
            error: error
        },{status: 500})
    }
}