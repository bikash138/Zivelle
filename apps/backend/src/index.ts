import express from 'express'
import cors from 'cors'
import {prisma} from '@repo/database/prisma'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req,res)=>{
    res.send("Hey You are in Server")
})

app.post('/create-order', async (req,res)=>{
    try{
        const { cartItems, totalAmount, userId } = req.body

        const result = await prisma.$transaction(async(tx) => {
            const orderItems = []
            for(const item of cartItems){
                const product = await tx.item.findUnique({ 
                    where: { 
                        id: item.productId 
                    } 
                });
                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }
                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for product ${product.title}`);
                }
                
                await prisma.item.update({
                    where:{
                        id: item.productId
                    },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                })
                orderItems.push({
                    sellerId: product.adminId,
                    itemId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                    size: item.size
                })
            }
            const order = await prisma.order.create({
                data: {
                    total: totalAmount,
                    orderStatus: "Reserved", 
                    paymentStatus: "Pending",
                    customerId: userId,
                    razorpayOrderId: '',
                    items: {
                        create: orderItems
                    }
                },
                include: {
                    items: {
                        include: {
                            item: true,
                            seller: true
                        }
                    }
                }
            })
            return order
        })
        res.status(200).json({
            success: true,
            message: "Order Successfully Reserved",
            order: result
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
})

const PORT = process.env.PORT || 8000
app.listen(8000, ()=>{
    console.log(`Server Started at PORT ${PORT}`)
})