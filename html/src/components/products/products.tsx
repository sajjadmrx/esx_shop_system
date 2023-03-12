import { useState, useContext } from 'react'
import { Card, Button } from 'react-daisyui';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductComponent } from './product.component';
import { cartContext } from '../../contexts/cart.context';
import { CartContext } from '../../interfaces/contexts.interface';


const products = [
    {
        name: "noshabeh",
        icon: "https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-512.png",
        price: 500,
        offer: 40
    },
    {
        name: "pizaa",
        icon: "https://cdn-icons-png.flaticon.com/512/3595/3595458.png",
        price: 450,
        offer: 0
    },
    {
        name: "phone",
        icon: "https://www.freepnglogos.com/uploads/mobile-png/device-mobile-phone-icon-small-flat-iconset-paomedia-20.png",
        price: 7000
    },
    {
        name: "map",
        icon: "https://cdn-icons-png.flaticon.com/512/1865/1865269.png",
        price: 3000
    },
    {
        name: "pizaa",
        icon: "https://cdn-icons-png.flaticon.com/512/3595/3595458.png",
        price: 450
    },
    {
        name: "pizaa2",
        icon: "https://cdn-icons-png.flaticon.com/512/3595/3595458.png",
        price: 450,
        offer: 25
    },
    {
        name: "pizaa3",
        icon: "https://cdn-icons-png.flaticon.com/512/3595/3595458.png",
        price: 450
    },
    {
        name: "phone",
        icon: "https://www.freepnglogos.com/uploads/mobile-png/device-mobile-phone-icon-small-flat-iconset-paomedia-20.png",
        price: 7000
    },
    {
        name: "noshabeh",
        icon: "https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-512.png",
        price: 500
    }, {
        name: "phone",
        icon: "https://www.freepnglogos.com/uploads/mobile-png/device-mobile-phone-icon-small-flat-iconset-paomedia-20.png",
        price: 7000,
        offer: 25
    },
    {
        name: "noshabeh",
        icon: "https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-512.png",
        price: 500
    }, {
        name: "phone",
        icon: "https://www.freepnglogos.com/uploads/mobile-png/device-mobile-phone-icon-small-flat-iconset-paomedia-20.png",
        price: 7000
    },
    {
        name: "noshabeh",
        icon: "https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-512.png",
        price: 500,
        offer: 15
    }, {
        name: "phone",
        icon: "https://www.freepnglogos.com/uploads/mobile-png/device-mobile-phone-icon-small-flat-iconset-paomedia-20.png",
        price: 7000
    },
    {
        name: "noshabeh1",
        icon: "https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-512.png",
        price: 500
    },
    {
        name: "noshabeh2",
        icon: "https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-512.png",
        price: 500
    },
    {
        name: "noshabeh3",
        icon: "https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-512.png",
        price: 500
    },
    {
        name: "noshabeh4",
        icon: "https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-512.png",
        price: 500
    },
]



export function ProductsComponent() {
    const cartContextData = useContext<CartContext>(cartContext)
    const { cart, setCart } = cartContextData
    function addToCart(product: any) {
        let currentProduct: any = cart.find((p: any) => p.name == product.name)
        if (currentProduct) {
            currentProduct.total += product.number || 1
        }
        else {
            product.total = product.number || 1
            cart.push(product)
        }
        setCart([...cart])
    }

    return (
        <div className='grid grid-cols-4 gap-4 justify-center h-80 p-1 '>
            {products.map((item: any, index: any) => {
                return (
                    <ProductComponent key={index} item={item} onAdd={() => addToCart(item)} />
                )
            })}
        </div>
    )
}