import {
    Activity,
} from "lucide-react";

import {
    formatSetupPrice,
} from "@/src/helpers/formatSetupPrice";

type SetupCurrentPriceProps = {
    price: number | null;
    isLoading: boolean;
};

const SetupCurrentPrice = ({
                               price,
                               isLoading,
                           }: SetupCurrentPriceProps) => {
    return (
        <div
            className="
                rounded-xl
                border
                border-[var(--color-border)]
                bg-[var(--color-background)]
                px-4
                py-3
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >
                    <Activity
                        className="
                            size-4
                            text-[var(--color-brand)]
                        "
                        aria-hidden="true"
                    />

                    <span
                        className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-wide
                            text-[var(--color-text-muted)]
                        "
                    >
                        Поточна ціна
                    </span>
                </div>

                <span
                    className="
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
                            isLoading
                                ? `
                                        animate-pulse
                                        bg-[var(--color-warning)]
                                    `
                                : `
                                        bg-[var(--color-success)]
                                    `
                        }
                        `}
                    />

                    {isLoading
                        ? "Підключення"
                        : "Live"}
                </span>
            </div>

            <div
                className="
                    mt-2
                    overflow-hidden
                    text-ellipsis
                    whitespace-nowrap
                    font-mono
                    text-xl
                    font-semibold
                    tabular-nums
                    text-[var(--color-text)]
                "
                title={
                    price === null
                        ? undefined
                        : String(price)
                }
            >
                {isLoading
                    ? "—"
                    : formatSetupPrice(price)}
            </div>
        </div>
    );
};

export {SetupCurrentPrice};