import { S3 } from "@/lib/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function DELETE(req: Request){
    try{
        const body = await req.json()
        const key = body.key
        if(!key){
            return NextResponse.json({
                success:false,
                message: "Cannot find the key"
            }, {status: 400})
        }
        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key
        })
        await S3.send(command)
        return NextResponse.json({
            sucess: true,
            message: "File Deleted Successfully"
        }, {status: 200})
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while deleting the file"
        }, {status: 500})
    }
}