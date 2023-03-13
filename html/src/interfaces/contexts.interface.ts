import { ProductInCart } from "./product.interface"

export interface CurrentActionContext<A = any> {
    currentAction: string | null
    setCurrentAction: any
    attach: A
    setAttach: any
}
export interface CartContext {
    cart: ProductInCart[]
    setCart: any
}