"use client";

import {X} from "lucide-react";

import {useLanguage} from "@/src/context";

type CreateSetupModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateSetupModal = ({
                              isOpen,
                              onClose,
                          }: CreateSetupModalProps) => {
    const {locale} = useLanguage();

    if (!isOpen) {
        return null;
    }

    const handleOverlayClick = () => {
        onClose();
    };

    const handleModalClick = (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        event.stopPropagation();
    };

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/60
                p-4
                backdrop-blur-sm
            "
            onClick={handleOverlayClick}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-setup-modal-title"
                className="
                    max-h-[calc(100vh-2rem)]
                    w-full
                    max-w-2xl
                    overflow-y-auto
                    rounded-2xl
                    border
                    border-[var(--color-border)]
                    bg-[var(--color-surface)]
                    text-[var(--color-text)]
                    shadow-2xl
                "
                onClick={handleModalClick}
            >
                <header
                    className="
                        sticky
                        top-0
                        z-10
                        flex
                        items-center
                        justify-between
                        gap-4
                        border-b
                        border-[var(--color-border)]
                        bg-[var(--color-surface)]
                        px-5
                        py-4
                        sm:px-6
                    "
                >
                    <h2
                        id="create-setup-modal-title"
                        className="
                            text-lg
                            font-semibold
                            text-[var(--color-text)]
                            sm:text-xl
                        "
                    >
                        {locale.createSetup.title}
                    </h2>

                    <button
                        type="button"
                        aria-label={locale.createSetup.close}
                        onClick={onClose}
                        className="
                            flex
                            size-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            text-[var(--color-text-muted)]
                            transition-colors
                            duration-200
                            hover:bg-[var(--color-background)]
                            hover:text-[var(--color-text)]
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[var(--color-brand)]
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-[var(--color-surface)]
                        "
                    >
                        <X
                            className="size-5"
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </button>
                </header>

                <div className="px-5 py-5 sm:px-6 sm:py-6">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                        {locale.createSetup.testContent}
                    </p>
                </div>
            </div>
        </div>
    );
};

export {CreateSetupModal};