import {
    Pencil,
    Trash2,
} from "lucide-react";

type SetupCardActionsProps = {
    onDeleteAction: () => void;
};

const SetupCardActions = ({
                              onDeleteAction,
                          }: SetupCardActionsProps) => {
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
                disabled
                aria-label="Редагувати сетап"
                title="Редагування буде додано пізніше"
                className="
                    flex
                    size-9
                    cursor-not-allowed
                    items-center
                    justify-center
                    rounded-lg
                    text-[var(--color-text-muted)]
                    opacity-45
                "
            >
                <Pencil
                    className="size-4"
                    aria-hidden="true"
                />
            </button>

            <button
                type="button"
                aria-label="Видалити сетап"
                title="Видалити сетап"
                onClick={onDeleteAction}
                className="
                    flex
                    size-9
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-lg
                    text-[var(--color-danger)]
                    transition-all
                    hover:bg-[color-mix(in_srgb,var(--color-danger)_12%,transparent)]
                    hover:text-[var(--color-danger)]
                    active:scale-95
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

export {SetupCardActions};