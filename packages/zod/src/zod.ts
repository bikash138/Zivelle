import {z} from 'zod'

export const SignUpSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    store: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

const categories = ["Men", "Women", "Kids"] as const
const subCategories = ["Topwear", "Bottomwear", "Winterwear"] as const
export const sizes = ["XS","S","M","L","XL","XXL"] as const
export const ListItemSchema = z.object({
    thumbnail: z.string().min(1, "Thumbnail is required"),
    title: z.string().max(30),
    description: z.string(),
    originalPrice: z.number(),
    price: z.number().min(100),
    category: z.enum(categories),
    subCategory: z.enum(subCategories),
    stock: z.number().min(10),
    size : z.array(z.enum(sizes)).nonempty()
    // size: z.array(z.object({
    //     size: z.enum(sizes),
    //     stock: z.number().min(0)
    // })).nonempty()
})
export const ListSchema = z.object({
    title: z.string().max(30),
    description: z.string(),
    price: z.number().min(100),
    category: z.enum(categories),
    stock: z.number().min(10),
    status: z.string(),
    isAvailable: z.boolean(),
    createdAt: z.string()
})
export const OrderSchema = z.object({
    itemId: z.number(),
    quantity: z.number(),
    total: z.number().min(100)
})


export const UserSignUpSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})