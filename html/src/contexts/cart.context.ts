import React from "react"
import { CartContext } from "../interfaces/contexts.interface"
export const cartContext = React.createContext<CartContext>({
    cart: [],
    setCart: () => { }
})