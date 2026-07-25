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
                shrink-0
                items-center
                gap-1
            "
        >
            <button
                type="button"
                aria-label="Редагувати сетап"
                title="Редагувати сетап"
                disabled
                className="
                    flex
                    size-8
                    items-center
                    justify-center
                    rounded-lg
                    text-[var(--color-text-muted)]
                    opacity-40
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
                    size-8
                    items-center
                    justify-center
                    rounded-lg
                    text-[var(--color-text-muted)]
                    transition-colors
                    hover:bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)]
                    hover:text-[var(--color-danger)]
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