import { Card, Button } from 'react-daisyui';
import { useContext } from 'react';
import { CartContext } from '../../interfaces/contexts.interface';
import { cartContext } from '../../contexts/cart.context';
import { ProductInCart } from '../../interfaces/product.interface';
interface Prop {
    item: any
}
export function CartItemComponent(prop: Prop) {

    const cartContextData = useContext<CartContext>(cartContext)
    const { cart, setCart } = cartContextData

    function deleteFromCart(product: ProductInCart) {
        const newCart = cart.filter((p: ProductInCart) => p.key != product.key)
        setCart(newCart)
    }

    const { item } = prop
    return (
        <Card bordered={true} className='border-[#a6abb19c] rounded-lg h-24 w-20 flex-none px-5 text-center  first:pl-6 last:pr-6'>
            <Card.Image
                src={item.icon}
                width={100}
                className='mt-2'
            />
            <p className='text-white text-lg '>{item.total}</p>
            <Card.Actions>
                <Button size='xs' className='mb-1' shape='circle' color='ghost'
                    onClick={() => deleteFromCart(item)}>
                    🗑️
                </Button>
            </Card.Actions>
        </Card>
    )
}