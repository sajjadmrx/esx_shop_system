import { useContext } from 'react';
import { Card, Button, Avatar, Input, Table, ButtonGroup } from 'react-daisyui';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ProductsComponent } from '../products/products';
import { MdDeleteForever, MdEdit, MdOutlineAdd, MdOutlineAddBox, MdRemove } from 'react-icons/md';
import { CurrentActionContext } from '../../interfaces/contexts.interface';
import { currentActionContext } from '../../contexts/action.context';
import { EventsName } from '../../constants/eventsName';
interface Props {
    closed: boolean;
}
const MySwal = withReactContent(Swal)
export function AdminMenuComponent(props: Props) {
    const currentActionContextData = useContext<CurrentActionContext>(currentActionContext)
    const isShow: boolean = currentActionContextData.currentAction == EventsName.OPEN_ADMIN_MENU


    async function handleSwalClick(item: any, cb: any) {
        const { value: formValues } = await MySwal.fire({
            title: 'Add Product',
            html:
                (
                    <div>
                        <Input id='uniqeName' placeholder='Unique Name' className='swal2-input' type='text' value={item.key || ''} required></Input>
                        <Input id='productName' placeholder='lebel' className='swal2-input' type='text' value={item.label || ''} required></Input>
                        <Input id='weight' placeholder='weight' className='swal2-input' type='number' value={item.weight || ''} required min={0} max={100}></Input>
                        <Input id='price' placeholder='Price' className='swal2-input' type='text' required value={item.price || ''}></Input>
                        <Input id='offer' placeholder='offer 0-100' className='swal2-input w-20' type='number' min={0} max={100} defaultValue={item.offer || 0}></Input>
                    </div>
                ),
            focusConfirm: true,
            preConfirm: () => {
                // @ts-ignore
                const uniqeName: string | null = document.getElementById('uniqeName')?.value || null;
                // @ts-ignore
                const productName: string | null = document.getElementById('productName')?.value || null;
                // @ts-ignore
                const price: string | null = document.getElementById('price')?.value || null;
                // @ts-ignore
                const offer: string | null = document.getElementById('offer')?.value || null;
                // @ts-ignore
                const weight: string | null = document.getElementById('weight')?.value || null;
                if (Number(offer) > 100) {
                    return Swal.showValidationMessage(
                        `Invalid Offer`
                    )
                }
                if (!uniqeName || !productName || !Number(price) || !Number(weight))
                    return Swal.showValidationMessage(
                        `Invalid Data`
                    )
                return [
                    uniqeName,
                    productName,
                    price,
                    offer,
                    weight
                ];
            },
        });

        if (formValues) {
            const [uniqueName, productName, price, offer] = formValues;
            cb({ uniqueName, productName, price, offer })
        }
    }


    return (
        <div hidden={!isShow}>
            <div className='relative top-[-60px]'>
                <h1 className='text-white font-[Roboto]'>Admin Panel</h1>
                <hr />
                <div className='relative top-4'>
                    <Button onClick={() => handleSwalClick({}, (item: any) => console.log(item))} className=' bg-slate-500 '>
                        <MdOutlineAdd className='mr-2' />
                        Add Product</Button>
                </div>
            </div>
            <div className="overflow-x-auto h-96 mt-5">
                <Table  >
                    <Table.Head>
                        <span />
                        <span>Key</span>
                        <span>Label</span>
                        <span>Price</span>
                        <span>Offer</span>
                        <span>Weight</span>
                        <span />

                    </Table.Head>

                    <Table.Body>
                        {['pizza', 'water', 'phone', 'test'].map((va, index) => {
                            return (
                                <Table.Row>
                                    <span>{index + 1}</span>
                                    <span>{va}</span>
                                    <span>{va}</span>
                                    <span>1,000</span>
                                    <span>0</span>
                                    <span>1</span>
                                    <div>
                                        <ButtonGroup >
                                            <Button onClick={() => handleSwalClick({ key: 'test', label: 'label', weight: 2, price: 1000, offer: 20 }, console.log)}>
                                                <MdEdit size={15} />
                                            </Button>
                                            <Button>
                                                <MdDeleteForever size={15} />
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </Table.Row>
                            )
                        })

                        }
                    </Table.Body>
                </Table>




            </div>
        </div>
    )
}