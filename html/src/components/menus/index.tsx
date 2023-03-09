import { useEffect } from 'react';
import { messageHandler } from '../../handlers/message.handler';
import { currentActionContext } from '../../contexts/action.context';
import { CurrentActionContext } from '../../interfaces/contexts.interface';
import React from 'react';
import { Hero, Button, Card, Badge } from 'react-daisyui';
import { UserMenuComponent } from './user.menu';
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
                <div className="px-0 sm:p-4 bg-[#252e38] hero-content text-center border-[#5d7e9721] rounded-[18px] max-w-[350px] md:max-w-[450px] md:min-w-[720px]  border-[4px]  shadow-lg mb-1 ">
                    <div className="max-w-full sm:pt-[100px] sm:pb-[100px] sm:pr-[30px] sm:pl-[30px]">
                        <div className="relative top-[-111px] left-[320px]">
                            <Button className='border-gray-400' shape='circle' onClick={() => close()}>❌</Button>
                        </div>
                        <div className='relative top-[-99px]'>
                            <h1 className='font-bold text-white '>
                                ------
                                🛍️ SHOP SYSTEM 🛍️
                                ------
                            </h1>
                            <span className='font-normal text-slate-50 text-opacity-70'>Beta</span>
                        </div>
                        <UserMenuComponent closed={isHidden} />
                    </div>

                </div>


            </div>
        </div >
    )
}

/*
    position: relative;
    top: -111px;
    left: 594px;
    */