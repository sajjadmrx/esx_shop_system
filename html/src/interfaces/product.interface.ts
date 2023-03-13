export interface Product {
    id: number
    key: string
    label: string
    price: number
    offer: number
    weight: number
}
export interface ProductInCart extends Product {
    total: number
    icon: string,
    selectedNumber: number
}