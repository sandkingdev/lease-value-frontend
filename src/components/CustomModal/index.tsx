import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { CustomModalMainComponent, } from './CustomModalMainComponent';
import { DialogTitleSubComponent } from '../DialogTitleComponent';

export const CustomModal = ({
  isOpen,
  setIsOpen,
  label,
}: {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  label: string,
}) => {

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative border-solid custom-modal-component"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center w-screen py-4">
        <DialogPanel className="custom-modal-panel lg:right-10 xl:right-[50px] mx-auto w-max p-[1px] rounded-xl border border-whtie">
          <div className='custom-modal-panel-child rounded-xl w-[320px] sm:w-[480px] bg-custom-grey-2'>
            <DialogTitle className='flex justify-between px-5 py-5 border-b-[1px] border-whtie rounded-t-xl text-custom-white-1'>
              <DialogTitleSubComponent
                title={label}
                logoComponent={
                  <></>
                }
                setIsOpen={setIsOpen}
              />
            </DialogTitle>

            <CustomModalMainComponent
              setIsOpen={setIsOpen}
              buttonLabel={label}
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}