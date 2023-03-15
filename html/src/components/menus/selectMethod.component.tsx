import React from 'react';
import { Button, Modal } from 'react-daisyui';
import { useState } from 'react';
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
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
            <Modal open={visible}>
                <Modal.Header className="font-bold">
                    Select Payment Method
                </Modal.Header>

                <Modal.Body>
                    <div className='flex justify-center gap-1'>
                        <div>
                            <Button size='lg' onClick={() => selectHandler("BANK")}>
                                <BsCreditCard2BackFill size={size} />
                            </Button>
                            <br />
                            <span className='font-[Roboto] font-light'> Bank</span>
                        </div>
                        <div>
                            <Button size='lg' onClick={() => selectHandler("CASH")}>
                                <GiMoneyStack size={size} />
                            </Button>
                            <br />
                            <span className='font-[Roboto] font-light'> Cash</span>

                        </div>
                    </div>
                </Modal.Body>

                <Modal.Actions className='float-left'>
                    <Button onClick={toggleVisible} color='error' shape='circle'>
                        <IoMdClose />
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )


}