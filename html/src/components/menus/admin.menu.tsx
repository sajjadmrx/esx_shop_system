import { useContext, useState, useEffect } from 'react';
import { Card, Button, Avatar, Input, Table, ButtonGroup, Alert } from 'react-daisyui';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { MdDeleteForever, MdEdit, MdOutlineAdd } from 'react-icons/md';
import { CiWarning } from 'react-icons/ci';
import { AiFillFolderAdd } from "react-icons/ai"
import { CurrentActionContext } from '../../interfaces/contexts.interface';
import { currentActionContext } from '../../contexts/action.context';
import { EventsName } from '../../constants/eventsName';
import { Product } from '../../interfaces/product.interface';
import { apiService } from '../../services/service';
interface Props {
    closed: boolean;
}
const MySwal = withReactContent(Swal)
export function AdminMenuComponent(props: Props) {
    const currentActionContextData = useContext<CurrentActionContext>(currentActionContext)
    const isShow: boolean = currentActionContextData.currentAction == EventsName.OPEN_ADMIN_MENU
    const products = currentActionContextData.attach as Product[]
    const [item, setItem] = useState(null)


    async function addOrEditFromItem(item: any, cb: any) {
        const elements: Array<JSX.Element> = [
            <Input id='uniqeName' placeholder='key' className='swal2-input' type='text' defaultValue={item.key || ''} required></Input>,
            <Input id='price' placeholder='Price' className='swal2-input' type='number' required defaultValue={item.price || ''}></Input>,

        ]
        const isEdit = !!item.label
        if (isEdit) {
            elements.push(
                <Input id='label' placeholder='label' className='swal2-input' type='text' defaultValue={item.label || ''} required></Input>,
            )
        }
        elements.push(<Input id='offer' placeholder='offer 0-100' className='swal2-input w-20' type='number' min={0} max={100} defaultValue={item.offer || 0}></Input>)
        const { value: formValues } = await MySwal.fire({
            title: item.key ? 'Edit Product ' : 'Add Product',
            html:
                (
                    <div>
                        {!isEdit && <Alert color='warning'>
                            <CiWarning />
                            add product from `items` table
                        </Alert>}
                        {elements.map(elm => elm)}
                    </div>
                ),
            focusConfirm: true,
            preConfirm: () => {
                // @ts-ignore
                const uniqeName: string | null = document.getElementById('uniqeName')?.value || null;
                // @ts-ignore
                const label: string | null = document.getElementById('label')?.value || null;
                // @ts-ignore
                const price: string | null = document.getElementById('price')?.value || null;
                // @ts-ignore
                const offer: string | null = document.getElementById('offer')?.value || null;
                if (Number(offer) > 100) {
                    return Swal.showValidationMessage(
                        `Invalid Offer`
                    )
                }
                if (!uniqeName || !Number(price))
                    return Swal.showValidationMessage(
                        `Invalid Data`
                    )
                if (item.label && !label)
                    return Swal.showValidationMessage(
                        `Invalid Data`
                    )
                return [
                    uniqeName,
                    price,
                    offer,
                    label
                ];
            },
        });

        if (formValues) {
            const [key, price, offer, label] = formValues;
            cb({ key, price, offer, label })
        }
    }

    useEffect(() => {
        if (!item) return;

        (async () => {
            const response = await apiService.addItem(item)
            if (response.success) {
                currentActionContextData.setAttach(response.attach)
            }
            else {
                // todo show error message
            }
        })()

    }, [item])

    if (isShow)
        return (
            <div >
                <div className='relative top-[-60px]'>
                    <h1 className='text-white font-[Roboto]'>Admin Panel</h1>
                    <hr />
                    <div className='relative top-4'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <Button onClick={() => addItemAndProduct({}, (item: any) => setItem(item))} color='success' >
                                    <MdOutlineAdd className='mr-2' />
                                    Add item and product</Button>
                            </div>
                            <div>
                                <Button onClick={() => addOrEditFromItem({}, (item: any) => setItem(item))} color='accent'>
                                    <AiFillFolderAdd className='mr-2' />
                                    Add  From Items</Button>
                            </div>
                        </div>
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
                            {products && products.map((va, index) => {
                                return (
                                    <Table.Row>
                                        <span>{index + 1}</span>
                                        <span>{va.key}</span>
                                        <span>{va.label}</span>
                                        <span>{va.price}</span>
                                        <span>{va.offer}</span>
                                        <span>{va.weight}</span>
                                        <div>
                                            <ButtonGroup >
                                                <Button onClick={() => addOrEditFromItem(va, (updatedData: any) => update(va.key, updatedData, currentActionContextData))}>
                                                    <MdEdit size={15} />
                                                </Button>
                                                <Button onClick={() => remove(va.key, currentActionContextData)}>
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
    else
        return <div></div>
}

async function addItemAndProduct(item: any, cb: any) {
    const elements: Array<JSX.Element> = [
        <Input id='uniqeName' placeholder='key' className='swal2-input' type='text' defaultValue={item.key || ''} required></Input>,
        <Input id='label' placeholder='label' className='swal2-input' type='text' defaultValue={item.label || ''} required></Input>,
        <Input id='weight' placeholder='weight' className='swal2-input' type='number' required defaultValue={item.weight || ''}></Input>,
        <Input id='price' placeholder='Price' className='swal2-input' type='text' required defaultValue={item.price || ''}></Input>,
        <Input id='offer' placeholder='offer 0-100' className='swal2-input w-20' type='number' min={0} max={100} defaultValue={item.offer || 0}></Input>,
    ]
    const { value: formValues } = await MySwal.fire({
        title: 'Add Product',
        html:
            (
                <div>
                    {elements.map(elm => elm)}
                </div>
            ),
        focusConfirm: true,
        preConfirm: () => {
            // @ts-ignore
            const uniqeName: string | null = document.getElementById('uniqeName')?.value || null;
            // @ts-ignore
            const label: string | null = document.getElementById('label')?.value || null;
            // @ts-ignore
            const weight: string | null = document.getElementById('weight')?.value || null;
            // @ts-ignore
            const price: string | null = document.getElementById('price')?.value || null;
            // @ts-ignore
            const offer: string | null = document.getElementById('offer')?.value || null;
            // @ts-ignore
            if (Number(offer) > 100) {
                return Swal.showValidationMessage(
                    `Invalid Offer`
                )
            }
            if (!uniqeName || !label || !Number(price) || !Number(weight))
                return Swal.showValidationMessage(
                    `Invalid Data`
                )
            return [
                uniqeName,
                label,
                weight,
                price,
                offer,
            ];
        },
    });

    if (formValues) {
        const [key, label, weight, price, offer] = formValues;
        cb({ key, label, weight, price, offer })
    }
}

async function remove(key: string, currentActionContextData: CurrentActionContext) {
    const response = await apiService.remove(key)
    if (response.success) {
        currentActionContextData.setAttach(response.attach)
    }
}
async function update(key: string, updatedData: any, currentActionContextData: CurrentActionContext) {
    const response = await apiService.update(key, updatedData)
    if (response.success) {
        currentActionContextData.setAttach(response.attach)
    }
}