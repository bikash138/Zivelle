import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database/prisma';
import { _success } from 'zod/v4/core';

export async function POST(req: NextRequest) {
  try{
    const body = await req.json();
    const { 
        email,
        password,
        name,
        store
     } = body;

    // if (!id) {
    //     return NextResponse.json({ 
    //         message: 'Missing Clerk user id' 
    //     }, { status: 400 });
    // }

    const seller = await prisma.seller.create({
      data:{
        email,
        password,
        name,
        store
      }
    });

    // if (!user) {
    //   user = await prisma.user.create({
    //     data: {
    //       clerkId: id,
    //       email: email_addresses?.[0]?.email_address || null,
    //       name: first_name || null,
    //       photo: profile_image_url || null,
    //     },
    //   });
    // }

    return NextResponse.json({ seller });
  }catch(error){
    console.log(error)
    return NextResponse.json({ 
      message: "Something went wrong while creating seller",
      error: error
     });
  }
}

export async function GET(){
  try{
    const userId = '7897a286-164c-4766-b031-74498767fbc4'
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

export async function PATCH(req: NextRequest) {
  try{
    const userId = '7897a286-164c-4766-b031-74498767fbc4'
    const body = await req.json()
    const { name, email, store } = body 

    const updatedSeller = await prisma.seller.update({
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