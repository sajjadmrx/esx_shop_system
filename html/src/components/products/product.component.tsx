import { Card, Button } from 'react-daisyui';
import { MdAddShoppingCart } from 'react-icons/md';
import { Product, ProductInCart } from '../../interfaces/product.interface';
interface Prop {
    item: ProductInCart
    onAdd: any
}
export function ProductComponent(prop: Prop) {
    const item = prop.item
    return (
        <Card bordered={true} className='border-[#84818169] '>
            <Card.Image
                src={item.icon}
                width={100}
                className='mt-2'
            />
            <Card.Body className="mt-1 items-center text-center bg-opacity-40 rounded-b-xl bg-[#e9e9e92e] ">
                <Card.Title>
                    <p className="text-ellipsis overflow-hidden text-sm w-24 leading-4 text-white ">
                        {item.label}
                    </p>
                </Card.Title>
                <span className='tabular-nums text-slate-200'>
                    ${item.price.toLocaleString()}
                    {item.offer > 0 && <sup className='text-green-400 ml-1'>%{item.offer}</sup>}
                </span>
                <Card.Actions className="justify-center">
                    <input type='number' className='w-10 rounded-sm bg-gray-800 text-white text-center' min="1" max="5" defaultValue={1} required
                        onChange={(ta) => item.selectedNumber = Number(ta.target.value) || 1}
                    ></input>
                    <Button
                        className='bg-green-600 hover:bg-green-800 border-0 text-white '
                        size='xs' onClick={() => prop.onAdd(item)}>
                        <MdAddShoppingCart className="mr-2 " />
                        Add To Card
                    </Button>
                </Card.Actions>
            </Card.Body>
        </Card>
    )
}