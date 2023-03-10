import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { useContext } from 'react';
import { CartContext } from '../../interfaces/contexts.interface';
import { cartContext } from '../../contexts/cart.context';
import { CartItemComponent } from './cart.item';

export function Cart() {
    const cartContextData = useContext<CartContext>(cartContext)
    const { cart } = cartContextData

    return (
        <div>
            <p className='text-white text-lg'>🛒 Your Cart:</p>
            <div className='flex justify-center gap-5 h-32 p-1 px-4 rounded-lg overflow-x-auto'>
                {
                    !cart.length && <MdOutlineRemoveShoppingCart size={100} className='text-gray-800' />
                }
                {cart.map((item: any, index: any) => {
                    return (
                        <CartItemComponent key={index} item={item} />
                    )
                })}
            </div>
        </div >
    )
}