"use client";

import {
    Pencil,
    Trash2,
} from "lucide-react";

import {
    useLanguage,
} from "@/src/context";

type SetupCardActionsProps = {
    onUpdateAction: () => void;
    onDeleteAction: () => void;
};

const SetupCardActions = ({
                              onUpdateAction,
                              onDeleteAction,
                          }: SetupCardActionsProps) => {
    const { locale } =
        useLanguage();

    return (
        <div
            className="
                flex
                items-center
                justify-end
                gap-2
                border-t
                border-[var(--color-border)]
                px-4
                py-2.5
            "
        >
            <button
                type="button"
                aria-label={
                    locale.setups
                        .edit
                }
                title={
                    locale.setups
                        .edit
                }
                onClick={
                    onUpdateAction
                }
                className="
                    flex
                    size-9
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-lg
                    text-[var(--color-text-muted)]
                    transition-colors
                    hover:bg-[var(--color-background)]
                    hover:text-[var(--color-text)]
                    active:bg-[var(--color-surface)]
                "
            >
                <Pencil
                    className="size-4"
                    aria-hidden="true"
                />
            </button>

            <button
                type="button"
                aria-label={
                    locale.setups
                        .delete
                }
                title={
                    locale.setups
                        .delete
                }
                onClick={
                    onDeleteAction
                }
                className="
                    flex
                    size-9
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-lg
                    text-[var(--color-danger)]
                    transition-colors
                    hover:bg-[color-mix(in_srgb,var(--color-danger)_12%,transparent)]
                    hover:text-[var(--color-danger)]
                    active:bg-[color-mix(in_srgb,var(--color-danger)_18%,transparent)]
                "
            >
                <Trash2
                    className="size-4"
                    aria-hidden="true"
                />
            </button>
        </div>
    );
};

export {
    SetupCardActions,
};