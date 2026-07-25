import {
    TrendingDown,
    TrendingUp,
} from "lucide-react";

import type {
    SetupDirection,
} from "@/src/types/setup";

import {
    SetupStatusToggle,
} from "./SetupStatusToggle";

type SetupCardHeaderProps = {
    symbol: string;
    direction: SetupDirection;
    isActive: boolean;
    isUpdatingStatus: boolean;
    onToggleStatusAction: () => void;
};

const SetupCardHeader = ({
                             symbol,
                             direction,
                             isActive,
                             isUpdatingStatus,
                             onToggleStatusAction,
                         }: SetupCardHeaderProps) => {
    const isLong =
        direction === "LONG";

    return (
        <header
            className="
                flex
                min-w-0
                items-center
                gap-3
            "
        >
            <div
                className={`
                    flex
                    size-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${
                    isLong
                        ? `
                                bg-[color-mix(in_srgb,var(--color-success)_12%,var(--color-surface))]
                                text-[var(--color-success)]
                            `
                        : `
                                bg-[color-mix(in_srgb,var(--color-danger)_12%,var(--color-surface))]
                                text-[var(--color-danger)]
                            `
                }
                `}
            >
                {isLong ? (
                    <TrendingUp
                        className="size-4"
                        aria-hidden="true"
                    />
                ) : (
                    <TrendingDown
                        className="size-4"
                        aria-hidden="true"
                    />
                )}
            </div>

            <h2
                className="
                    min-w-0
                    flex-1
                    overflow-hidden
                    text-ellipsis
                    whitespace-nowrap
                    text-base
                    font-semibold
                    text-[var(--color-text)]
                "
                title={symbol}
            >
                {symbol}
            </h2>

            <SetupStatusToggle
                isActive={isActive}
                isUpdating={
                    isUpdatingStatus
                }
                onToggleAction={
                    onToggleStatusAction
                }
            />

            <span
                className={`
                    shrink-0
                    text-sm
                    font-semibold
                    ${
                    isLong
                        ? "text-[var(--color-success)]"
                        : "text-[var(--color-danger)]"
                }
                `}
            >
                {direction}
            </span>
        </header>
    );
};

export {SetupCardHeader};