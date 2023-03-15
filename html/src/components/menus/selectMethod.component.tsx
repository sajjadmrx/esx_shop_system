import React from 'react';
import { Button, Modal } from 'react-daisyui';
import { useState } from 'react';
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';
interface Prop {
    toggleComponent: JSX.Element
    cb: any
}
export function SelectMethodModal(prop: Prop) {
    const [visible, setVisible] = useState<boolean>(false)

    const toggleVisible = () => {
        setVisible(!visible)
    }
    const size = 50
    function selectHandler(target: string) {
        prop.cb(target)
        toggleVisible()
    }
    return (
        <div >
            {React.cloneElement(prop.toggleComponent, { onClick: toggleVisible })}
            <Modal open={visible} className='bg-gray-600'>
                <Modal.Header className="font-bold text-gray-200">
                    Select Payment Method
                </Modal.Header>
                <Button
                    size="sm"
                    shape="circle"
                    className="absolute right-2 top-2"
                    onClick={toggleVisible}
                >
                    ✕
                </Button>
                <Modal.Body>
                    <div className='flex justify-center gap-1'>
                        <div>
                            <Button size='lg' onClick={() => selectHandler("BANK")}>
                                <BsCreditCard2BackFill size={size} />
                            </Button>
                            <br />
                            <span className='font-[Roboto] text-gray-200'> Bank</span>
                        </div>
                        <div>
                            <Button size='lg' onClick={() => selectHandler("CASH")}>
                                <GiMoneyStack size={size} />
                            </Button>
                            <br />
                            <span className='font-[Roboto] text-gray-200'> Cash</span>
                        </div>
                    </div>
                </Modal.Body>


            </Modal>
        </div>
    )


}