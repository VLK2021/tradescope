"use client";

import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type ModalProps = {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
    description?: string;
    className?: string;
};

export const Modal = ({
                          isOpen,
                          title,
                          children,
                          onClose,
                          description,
                          className = "",
                      }: ModalProps) => {
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />

                <Dialog.Content
                    className={[
                        "fixed left-1/2 top-1/2 z-50",
                        "max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-2xl",
                        "-translate-x-1/2 -translate-y-1/2",
                        "overflow-y-auto rounded-2xl",
                        "border border-white/10 bg-zinc-950",
                        "shadow-2xl shadow-black/50",
                        "focus:outline-none",
                        "data-[state=closed]:animate-out",
                        "data-[state=open]:animate-in",
                        "data-[state=closed]:fade-out",
                        "data-[state=open]:fade-in",
                        "data-[state=closed]:zoom-out-95",
                        "data-[state=open]:zoom-in-95",
                        className,
                    ].join(" ")}
                >
                    <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-zinc-950 px-5 py-4 sm:px-6">
                        <div className="min-w-0">
                            <Dialog.Title className="text-lg font-semibold text-white sm:text-xl">
                                {title}
                            </Dialog.Title>

                            {description ? (
                                <Dialog.Description className="mt-1 text-sm leading-5 text-zinc-400">
                                    {description}
                                </Dialog.Description>
                            ) : null}
                        </div>

                        <Dialog.Close asChild>
                            <button
                                type="button"
                                aria-label="Закрити модальне вікно"
                                className="flex size-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                                <X size={20} />
                            </button>
                        </Dialog.Close>
                    </header>

                    <div className="px-5 py-5 sm:px-6 sm:py-6">
                        {children}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};