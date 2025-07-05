import { ListItemSchema } from '@repo/zod/zodTypes'
import { prisma } from '@repo/database/prisma'
import { NextRequest, NextResponse } from 'next/server'
import getUserId from "@/lib/getUserId"

export async function POST(req: NextRequest){
    try{
        const {userId, error} = await getUserId(req)
        if(error){
            return error
        }
        const body = await req.json()
        const parsedData = ListItemSchema.safeParse(body)

        if(!parsedData.success){
            return NextResponse.json({
                success: false,
                message: "Validation Failed",
                errors: parsedData.error.errors
            }, { status: 400 })
        }
        const{
            title,
            description,
            price,
            category,
            subCategory,
            stock,
            size  
        } = parsedData.data

        //Get thumnail image from request body
        // const thumbnail = req.files.productThumbnail

        //Upload thumbnail to clodinary
        // const thumbnailImage = await uploadImageToCloudinary(
        //     thumbnail,
        //     process.env.FOLDER_NAME
        // )
        // console.log(thumbnailImage)

        //Create a new Product Listing with given details
        const newItem = await prisma.item.create({
            data:{
                adminId: userId,
                title,
                description,
                price,
                category,
                subCategory,
                stock,
                size
            }
        })

        // const itemsSizes = await prisma.itemSize.create({
        //     data: size.map(s => (
        //         {
        //             itemId: newItem.id,
        //             size: s.size,
        //             stock: s.stock
        //         }
        //     ))
        // })

        //Return the new item and a success message
        return NextResponse.json({
            success:true,
            data: newItem,
            message: "Item Listed Successfully"
        },{status: 200})
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message: "Internal Server Error",
            error: error
        },{status: 500})
    }
}