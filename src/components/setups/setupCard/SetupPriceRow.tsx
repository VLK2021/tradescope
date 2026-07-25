import {
    calculatePriceDistance,
} from "@/src/helpers/calculatePriceDistance";
import {
    formatSetupPrice,
} from "@/src/helpers/formatSetupPrice";

type SetupPriceRowVariant =
    | "entry"
    | "takeProfit"
    | "stopLoss";

type SetupPriceRowProps = {
    label: string;
    price: string;
    currentPrice: number | null;
    variant: SetupPriceRowVariant;
};

const getVariantClasses = (
    variant: SetupPriceRowVariant,
): string => {
    if (variant === "takeProfit") {
        return `
            border-[color-mix(in_srgb,var(--color-success)_24%,var(--color-border))]
            bg-[color-mix(in_srgb,var(--color-success)_5%,transparent)]
        `;
    }

    if (variant === "stopLoss") {
        return `
            border-[color-mix(in_srgb,var(--color-danger)_24%,var(--color-border))]
            bg-[color-mix(in_srgb,var(--color-danger)_5%,transparent)]
        `;
    }

    return `
        border-[var(--color-border)]
        bg-[var(--color-background)]
    `;
};

const getDistanceClasses = (
    signedPercent: number,
): string => {
    if (signedPercent > 0) {
        return "text-[var(--color-success)]";
    }

    if (signedPercent < 0) {
        return "text-[var(--color-danger)]";
    }

    return "text-[var(--color-text-muted)]";
};

const SetupPriceRow = ({
                           label,
                           price,
                           currentPrice,
                           variant,
                       }: SetupPriceRowProps) => {
    const distance =
        calculatePriceDistance(
            currentPrice,
            price,
        );

    const distanceText = distance
        ? `${distance.absolutePercent.toFixed(2)}%`
        : "—";

    return (
        <div
            className={`
                grid
                min-w-0
                grid-cols-[42px_minmax(0,1fr)_68px]
                items-center
                gap-2
                rounded-lg
                border
                px-3
                py-2.5
                ${getVariantClasses(variant)}
            `}
        >
            <span
                className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[var(--color-text-muted)]
                "
            >
                {label}
            </span>

            <span
                className="
                    min-w-0
                    overflow-hidden
                    text-ellipsis
                    whitespace-nowrap
                    font-mono
                    text-sm
                    font-medium
                    tabular-nums
                    text-[var(--color-text)]
                "
                title={price}
            >
                {formatSetupPrice(price)}
            </span>

            <span
                className={`
                    text-right
                    font-mono
                    text-xs
                    font-semibold
                    tabular-nums
                    ${
                    distance
                        ? getDistanceClasses(
                            distance.signedPercent,
                        )
                        : "text-[var(--color-text-muted)]"
                }
                `}
            >
                {distanceText}
            </span>
        </div>
    );
};

export {SetupPriceRow};

export type {
    SetupPriceRowVariant,
};