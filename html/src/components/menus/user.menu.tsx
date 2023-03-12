import React, { useState } from 'react';
import { CurrentActionContext } from '../../interfaces/contexts.interface';
import { currentActionContext } from '../../contexts/action.context';
import { EventsName } from '../../constants/eventsName';
import { Button } from 'react-daisyui';
import { useEffect } from 'react';
import { MdShoppingCartCheckout, MdAddShoppingCart } from 'react-icons/md'
import { ProductsComponent } from '../products/products';
import { Cart } from '../cart/cart';
import { cartContext } from '../../contexts/cart.context';

interface Props {
    closed: boolean
}
export function UserMenuComponent(props: Props) {
    const currentActionContextData = React.useContext<CurrentActionContext>(currentActionContext)
    const isShow: boolean = currentActionContextData.currentAction == EventsName.OPEN_MENU
    const [cart, setCart] = useState<any[]>([])

    useEffect(() => {
        if (props.closed) {
            setCart([])
        }
    }, [props.closed])


    return (
        <div hidden={!isShow}>
            <cartContext.Provider value={{ cart, setCart }}>
                <div className='overflow-auto'>
                    <ProductsComponent />
                </div>
                <div className='mt-2 border border-gray-700 rounded-md border-dashed'>
                    <Cart />
                </div>
                <div className='mt-2'>
                    <h1 className='text-xl text-white font-[Roboto]'>Total Products: <strong className='text-red-400'>{cart.length}</strong></h1>
                    <h1 className='text-xl text-white font-[Roboto]'>Total Price: <strong className='text-green-300'>${Number(calculateTotalPrice(cart).toFixed()).toLocaleString()}</strong></h1>

                    <div className='mt-2'>
                        <Button className='bg-green-800 text-white border-0 hover:bg-green-600' >
                            <MdShoppingCartCheckout className='mr-2' />
                            Buy
                        </Button>
                    </div>
                </div>
            </cartContext.Provider>
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