"use client";

import {useState} from "react";

import {Modal} from "@/src/common/modal";

import {AddSetupButton} from "./AddSetupButton";

const AddSetupControl = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <AddSetupButton onClick={openModal} />

            <Modal
                isOpen={isModalOpen}
                title="Додати сетап"
                onClose={closeModal}
            >
                <div className="py-4 text-[var(--color-text)]">
                    Тут буде форма створення сетапу.
                </div>
            </Modal>
        </>
    );
};

export {AddSetupControl};