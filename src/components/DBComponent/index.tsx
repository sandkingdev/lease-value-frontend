import { useState } from "react";
import { CustomModal } from "../CustomModal";
import { modalTitles } from "../../config";

const DBComponent = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>('Save');

    const handleSaveButton = () => {
        setModalTitle(modalTitles.save);
        setIsOpenModal(true);
    }

    const handleLoadButton = () => {
        setModalTitle(modalTitles.load);
        setIsOpenModal(true);
    }

    return (
        <>
            <div className="flex w-full justify-end gap-x-5">
                <div className="bg-light-green px-5 py-1 border border-1 rounded-lg" onClick={handleSaveButton}>Save</div>
                <div className="bg-light-green px-5 py-1 border border-1 rounded-lg" onClick={handleLoadButton}>Load</div>
            </div>
            <CustomModal
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
                label={modalTitle}
            />
        </>
    )
};

export default DBComponent;