import {
    TrendingDown,
    TrendingUp,
} from "lucide-react";

import type {
    SetupDirection,
} from "@/src/types/setup";

import {
    SetupCardActions,
} from "./SetupCardActions";

type SetupCardHeaderProps = {
    symbol: string;
    direction: SetupDirection;
    isActive: boolean;
    onDeleteAction: () => void;
};

const SetupCardHeader = ({
                             symbol,
                             direction,
                             isActive,
                             onDeleteAction,
                         }: SetupCardHeaderProps) => {
    const isLong =
        direction === "LONG";

    return (
        <header
            className="
                flex
                items-start
                justify-between
                gap-3
                border-b
                border-[var(--color-border)]
                px-4
                py-4
            "
        >
            <div className="min-w-0">
                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                    "
                >
                    <h2
                        className="
                            min-w-0
                            overflow-hidden
                            text-ellipsis
                            whitespace-nowrap
                            text-lg
                            font-semibold
                            text-[var(--color-text)]
                        "
                        title={symbol}
                    >
                        {symbol}
                    </h2>

                    <span
                        className={`
                            inline-flex
                            items-center
                            gap-1
                            rounded-full
                            px-2
                            py-1
                            text-xs
                            font-semibold
                            ${
                            isLong
                                ? `
                                        bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)]
                                        text-[var(--color-success)]
                                    `
                                : `
                                        bg-[color-mix(in_srgb,var(--color-danger)_12%,transparent)]
                                        text-[var(--color-danger)]
                                    `
                        }
                        `}
                    >
                        {isLong ? (
                            <TrendingUp
                                className="size-3"
                                aria-hidden="true"
                            />
                        ) : (
                            <TrendingDown
                                className="size-3"
                                aria-hidden="true"
                            />
                        )}

                        {direction}
                    </span>
                </div>

                <div
                    className="
                        mt-2
                        inline-flex
                        items-center
                        gap-1.5
                        text-xs
                        text-[var(--color-text-muted)]
                    "
                >
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
                    />

                    {isActive
                        ? "Активний"
                        : "Неактивний"}
                </div>
            </div>

            <SetupCardActions
                onDeleteAction={
                    onDeleteAction
                }
            />
        </header>
    );
};

export {SetupCardHeader};