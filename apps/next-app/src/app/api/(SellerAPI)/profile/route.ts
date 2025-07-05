import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database/prisma';
import getUserId from "@/lib/getUserId"

//Get User Profile Details
export async function GET(req: NextRequest){
  try{
    const {userId, error} = await getUserId(req)
    if(error){
      return error
    }
    const userDetails = await prisma.seller.findUnique({
      where:{
        id: userId
      },
      select:{
        name: true,
        store: true,
        createdAt: true,
        email: true,
      }
    })
    return NextResponse.json({
      success:true,
      userDetails
    })
  }catch(error){
    console.log(error)
    return NextResponse.json({ 
      message: "Something went wrong while getting seller details",
      error: error
     });
  }
}

//Update user profile details
export async function PATCH(req: NextRequest) {
  try{
    const {userId, error} = await getUserId(req)
    if(error){
      return error
    }
    
    const body = await req.json()
    const { name, email, store } = body 

    await prisma.seller.update({
      where:{
        id: userId
      },
      data:{
        name, email, store
      }
    })
    return NextResponse.json({ 
      success: true,
      message: "Profile Updated Sucessfully" 
    }, { status: 200 });
  }catch(error){
    console.log(error)
    return NextResponse.json({ 
      message: "Something went wrong while updating seller",
      error: error
     }, {status: 500});
  }
}