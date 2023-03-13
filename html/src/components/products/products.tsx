import { useState, useContext } from 'react'
import { Card, Button } from 'react-daisyui';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductComponent } from './product.component';
import { cartContext } from '../../contexts/cart.context';
import { CartContext, CurrentActionContext } from '../../interfaces/contexts.interface';
import { Product, ProductInCart } from '../../interfaces/product.interface';
import { currentActionContext } from '../../contexts/action.context';


const products2: Product[] = [
    {
        id: 1,
        label: "water",
        key: "water",
        price: 500,
        offer: 40,
        weight: 1
    },
    {
        id: 2,
        label: "pizza",
        key: "pizza",
        price: 450,
        offer: 0,
        weight: 1,
    },
]




export function ProductsComponent() {
    const currentActionContextData = useContext<CurrentActionContext>(currentActionContext)

    const cartContextData = useContext<CartContext>(cartContext)
    const { cart, setCart } = cartContextData
    const products: Product[] = products2 //currentActionContextData.attach as Product[]

    function addToCart(product: ProductInCart) {
        let currentProduct: any = cart.find((p: any) => p.key == product.key)
        if (currentProduct) {
            currentProduct.total += product.selectedNumber || 1
        }
        else {
            product.total = product.selectedNumber || 1
            cart.push(product)
        }
        setCart([...cart])
    }

    return (
        <div className='grid grid-cols-4 gap-4 justify-center h-80 p-1 '>
            {products && products.map((item: Product, index: any) => {
                const itemInCart: ProductInCart = {
                    total: 0,
                    icon: `./icons/${item.key}.png`,
                    selectedNumber: 1,
                    ...item
                }
                return (
                    <ProductComponent key={index} item={itemInCart} onAdd={() => addToCart(itemInCart)} />
                )
            })}
        </div>
    )
}