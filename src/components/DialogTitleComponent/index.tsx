import { JSX } from "react";
import { RxCross2 } from "react-icons/rx";

export const DialogTitleSubComponent = ({
    title,
    logoComponent,
    setIsOpen,
}: {
    title: string,
    logoComponent: JSX.Element,
    setIsOpen: (arg0: boolean) => void,
}) => {

    return (
        <>
            <div className="flex items-center">
                <div className='text-xl font-semibold mr-3 text-white'>
                    {title}
                </div>
                {logoComponent}
            </div>

            <div className='flex items-center'>
                <RxCross2 className="h-6 w-6 text-white cursor-pointer" onClick={() => setIsOpen(false)} />
            </div>
        </>
    );
};
