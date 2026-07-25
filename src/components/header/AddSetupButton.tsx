"use client";

import {Plus} from "lucide-react";

import {useLanguage} from "@/src/context";

type AddSetupButtonProps = {
    onClick: () => void;
};

const AddSetupButton = ({
                            onClick,
                        }: AddSetupButtonProps) => {
    const {locale} = useLanguage();

    return (
        <button
            type="button"
            onClick={onClick}
            className="
                flex
                h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[var(--color-brand)]
                px-5
                text-sm
                font-medium
                text-white
                transition-colors
                duration-200
                hover:bg-[var(--color-brand-hover)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--color-brand)]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--color-background)]
                active:scale-[0.99]
                sm:text-base
                md:w-auto
                md:min-w-52
                lg:min-w-64
            "
        >
            <Plus
                className="size-5 shrink-0"
                strokeWidth={2}
                aria-hidden="true"
            />

            <span>{locale.header.addSetup}</span>
        </button>
    );
};

export {AddSetupButton};