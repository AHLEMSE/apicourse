import mongoose from "mongoose"
import userSchema from "./schemas/userSchema.js"
import productSchema from "./schemas/productSchema.js"
import orderSchema from "./schemas/orderSchema.js"


export const usersCollection = mongoose.model("user", userSchema)

export const productsCollection = mongoose.model("product", productSchema)

export const ordersCollection = mongoose.model("order", orderSchema)
// console.log('Models registered:');
// console.log('User:', mongoose.models['User']);
// console.log('Product:', mongoose.models['Product']);
// console.log('Order:', mongoose.models['Order']);