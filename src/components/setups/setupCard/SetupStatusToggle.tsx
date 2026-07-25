import {
    LoaderCircle,
} from "lucide-react";

type SetupStatusToggleProps = {
    isActive: boolean;
    isUpdating: boolean;
    onToggleAction: () => void;
};

const SetupStatusToggle = ({
                               isActive,
                               isUpdating,
                               onToggleAction,
                           }: SetupStatusToggleProps) => {
    const label = isActive
        ? "Активний"
        : "Неактивний";

    const ariaLabel = isActive
        ? "Зробити сетап неактивним"
        : "Зробити сетап активним";

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            title={ariaLabel}
            disabled={isUpdating}
            onClick={onToggleAction}
            className={`
                inline-flex
                h-8
                shrink-0
                cursor-pointer
                items-center
                justify-center
                gap-1.5
                rounded-lg
                border
                px-2.5
                text-xs
                font-semibold
                uppercase
                transition-colors
                disabled:cursor-wait
                disabled:opacity-60
                ${
                isActive
                    ? `
                            border-[color-mix(in_srgb,var(--color-success)_20%,transparent)]
                            bg-[color-mix(in_srgb,var(--color-success)_10%,transparent)]
                            text-[var(--color-success)]
                            hover:bg-[color-mix(in_srgb,var(--color-success)_16%,transparent)]
                        `
                    : `
                            border-[var(--color-border)]
                            bg-[var(--color-surface)]
                            text-[var(--color-text-muted)]
                            hover:border-[var(--color-text-muted)]
                            hover:text-[var(--color-text)]
                        `
            }
            `}
        >
            {isUpdating ? (
                <LoaderCircle
                    className="size-3.5 animate-spin"
                    aria-hidden="true"
                />
            ) : (
                <span
                    className={`
                        size-1.5
                        rounded-full
                        ${
                        isActive
                            ? "bg-[var(--color-success)]"
                            : "bg-[var(--color-text-muted)]"
                    }
                    `}
                    aria-hidden="true"
                />
            )}

            {label}
        </button>
    );
};

export {SetupStatusToggle};