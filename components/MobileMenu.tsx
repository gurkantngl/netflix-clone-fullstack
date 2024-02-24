import React from "react";

interface mobilProp{
    visible?:boolean;

}

const MobileMenu: React.FC<mobilProp> = ({visible}) => {
    if(!visible){
        return null;
    }
    return (

        <div className='bg-black w-48 absolute top-8 left-0 py-5 flex-col border-gray-400 flex'>
            <div className="flex flex-col">

            </div>
        </div>
    )
}

export default MobileMenu