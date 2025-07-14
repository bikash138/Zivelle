import { createSlice } from "@reduxjs/toolkit"
import { toast } from "sonner"
import { CartItem } from "@/types";


interface CartState {
  cart: CartItem[];
  total: number;
  totalItems: number;
}

const initialState: CartState = {
  cart: [],
  total: 0,
  totalItems: 0
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state, action) => {
      state.cart = action.payload.cart;
      state.total = action.payload.total;
      state.totalItems = action.payload.totalItems;
    },
    addToCart: (state, action) => {
      const {product, selectedSize, quantity} = action.payload
      const index = state.cart.findIndex((item) => item.id === product.id && item.selectedSize)

      if (index >= 0) {
        // If the item is already in the cart, do not modify the quantity
        toast.error("Already in cart")
        return
      }
      // If the course is not in the cart, add it to the cart
      state.cart.push({...product, quantity, selectedSize})
      // Update the total quantity and price
      state.totalItems += quantity
      state.total += product.price * quantity
      // Update to localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart))
      localStorage.setItem("total", JSON.stringify(state.total))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
      toast.success("Added to cart")
    },
    removeFromCart: (state, action) => {
      const product = action.payload
      const index = state.cart.findIndex((item) => item.id === product.id)

      if (index >= 0) {
        // If the course is found in the cart, remove it
        state.totalItems--
        state.total -= state.cart[index].price
        state.cart.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        // show toast
        toast.success("Removed from cart")
      }
    },
    resetCart: (state) => {
      state.cart = []
      state.total = 0
      state.totalItems = 0
      // Update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
    },
  },
})

export const { hydrateCart, addToCart, removeFromCart, resetCart } = cartSlice.actions

export default cartSlice.reducer
