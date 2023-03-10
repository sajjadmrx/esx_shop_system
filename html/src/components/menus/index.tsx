import { useEffect } from 'react';
import { messageHandler } from '../../handlers/message.handler';
import { currentActionContext } from '../../contexts/action.context';
import { CurrentActionContext } from '../../interfaces/contexts.interface';
import React from 'react';
import { Hero, Button, Card, Badge } from 'react-daisyui';
import { UserMenuComponent } from './user.menu';
import { RiCloseFill } from "react-icons/ri"

export function MenusComponents() {
    const currentActionContextData = React.useContext<CurrentActionContext>(currentActionContext)
    useEffect(() => { messageHandler(currentActionContextData) }, [])
    const isHidden: boolean = currentActionContextData.currentAction == null
    function close() {
        currentActionContextData.setCurrentAction(null)
    }
    return (
        <div hidden={isHidden}>

            <div className="hero min-h-screen">
                <div
                    style={{ background: "linear-gradient(to bottom, rgb(255 137 0 / 28%), #0d1dbafa)" }}
                    className="px-0 sm:p-4 hero-content text-center border-[#5d7e9721] rounded-[18px] max-w-[350px] md:max-w-[450px] md:min-w-[720px]  border-[4px]  shadow-lg mb-1 ">
                    <div className="max-w-full sm:pt-[100px] sm:pb-[100px] sm:pr-[30px] sm:pl-[30px]">
                        <div className="relative top-[-111px] left-[320px]">
                            <Button className='border-gray-400 hover:bg-red-600 border-0 text-gray-200' shape='circle' onClick={() => close()}>
                                <RiCloseFill />
                            </Button>
                        </div>
                        <div className='relative top-[-99px]'>
                            <h1 className='font-bold text-white font-[Roboto]'>
                                ------
                                🛍️ SHOP SYSTEM 🛍️
                                ------
                            </h1>
                            <span className='font-normal font-[Roboto] text-slate-900 text-opacity-70'>Beta</span>
                        </div>
                        <UserMenuComponent closed={isHidden} />
                    </div>

                </div>


            </div>
        </div >
    )
}
