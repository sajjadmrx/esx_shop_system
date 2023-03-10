import React, { useState } from 'react';
import { CurrentActionContext } from '../../interfaces/contexts.interface';
import { currentActionContext } from '../../contexts/action.context';
import { EventsName } from '../../constants/eventsName';
import { Input, Button, Card, Badge, Avatar } from 'react-daisyui';
import { useEffect } from 'react';
import { MdShoppingCartCheckout, MdAddShoppingCart } from 'react-icons/md'
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'

const products = [
    {
        name: "noshabeh",
        icon: "https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-512.png",
        price: 500,
    },
    {
        name: "pizaa",
        icon: "https://cdn-icons-png.flaticon.com/512/3595/3595458.png",
        price: 450
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
        price: 450
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
        price: 7000
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
        price: 500
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

interface Props {
    closed: boolean
}
export function UserMenuComponent(props: Props) {
    const currentActionContextData = React.useContext<CurrentActionContext>(currentActionContext)
    const isShow: boolean = currentActionContextData.currentAction == EventsName.OPEN_MENU
    const [cart, setCart] = useState<any[]>([])
    const [count, setCount] = useState<number>(1)

    function addToCart(product: any) {
        setCount(count + 1)
        let currentProduct: any = cart.find((p: any) => p.name == product.name)
        if (currentProduct) {
            console.log(currentProduct.total, product.number)
            currentProduct.total += product.number || 1
        }
        else {
            product.total = product.number || 1
            cart.push(product)
        }
        setCart(cart)
        console.log(`added to cart: `, cart)
    }

    function deleteFromCart(product: any) {
        const newCart = cart.filter((p) => p.name != product.name)
        setCart(newCart)
    }

    useEffect(() => {
        if (props.closed) {
            setCart([])
        }
    }, [props.closed])

    return (
        <div hidden={!isShow} className=''>
            <div className='overflow-auto'>

                <div className='grid grid-cols-4 gap-4 justify-center h-80 p-1 rounded-lg'>
                    {products.map((item: any, index) => {
                        return (
                            <Card bordered={true} className='border-[#4f53579c] rounded-lg' key={index}>
                                <Card.Image
                                    src={item.icon}
                                    alt="Shoes"
                                    width={100}
                                    className='mt-2'
                                    style={{ backdropFilter: "blur(10px)" }}
                                />
                                <Card.Body className="mt-1 items-center text-center bg-slate-900 bg-opacity-40 rounded-lg">
                                    <Card.Title>
                                        <p className="text-ellipsis overflow-hidden text-sm w-24 leading-4 text-white">{item.name}</p>
                                    </Card.Title>
                                    <span className='tabular-nums text-slate-200'>${item.price.toLocaleString()}</span>
                                    <Card.Actions className="justify-center">
                                        <input type='number' className='w-10 rounded-sm bg-gray-800 text-white text-center' min="1" max="5" defaultValue={1} required
                                            onChange={(ta) => item.number = Number(ta.target.value) || 1}
                                        ></input>
                                        <Button className='bg-green-600 hover:bg-green-800 border-0 text-white' size='xs' onClick={() => addToCart(item)}>
                                            <MdAddShoppingCart className="mr-2" />
                                            Add To Card
                                        </Button>
                                    </Card.Actions>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>

            </div>
            <div className='mt-2 border border-gray-600 rounded-md border-dashed'>
                <p className='text-white text-lg'>🛒 Your Cart:</p>
                <div className='flex justify-center gap-5 h-32 p-1 px-4 rounded-lg overflow-x-auto'>
                    {
                        !cart.length && <MdOutlineRemoveShoppingCart size={100} className='text-gray-500' />
                    }
                    {cart.map((item: any, index: any) => {
                        return (
                            <Card bordered={true} key={index} className='border-[#4f53579c] rounded-lg h-24 w-20 flex-none px-5 text-center  first:pl-6 last:pr-6'>
                                <Card.Image
                                    src={item.icon}
                                    alt="Shoes"
                                    width={100}
                                    className='mt-2'
                                    style={{ backdropFilter: "blur(10px)" }}
                                />
                                <p className='text-white text-lg '>{item.total}</p>
                                <Card.Actions>
                                    <Button size='xs' className='border-0' onClick={() => deleteFromCart(item)}>🗑️</Button>
                                </Card.Actions>
                            </Card>
                        )
                    })}
                </div>
            </div>
            <div className='mt-2'>
                <h1 className='text-xl text-white'>Total Products: <strong className='text-red-400'>{cart.length}</strong></h1>
                <h1 className='text-xl text-white'>Total Price: <strong className='text-green-300'>${calculateTotalPrice(cart).toLocaleString()}</strong></h1>

                <div className='mt-2'>
                    <Button className='bg-green-800 text-white border-0 hover:bg-green-600' >
                        <MdShoppingCartCheckout className='mr-2' />

                        Buy
                    </Button>
                </div>
            </div>

        </div>
    )
}

function calculateTotalPrice(card: any[]): number {
    let totalPrice: number = 0;
    for (let i = 0; i < card.length; i++) {
        let product = card[i];
        let price = product.price;
        if (product.total) {
            price *= product.total;
        }
        let discount = (product.offer || 0) / 100;
        totalPrice += price - price * discount;
    }
    return totalPrice;
}