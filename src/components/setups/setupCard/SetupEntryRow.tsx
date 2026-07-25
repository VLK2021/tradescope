import {
    calculatePriceDistance,
} from "@/src/helpers/calculatePriceDistance";
import {
    formatSetupPrice,
} from "@/src/helpers/formatSetupPrice";

type SetupEntryRowProps = {
    index: number;
    price: string;
    currentPrice: number | null;
};

const formatSignedPercent = (
    value: number,
): string => {
    const sign =
        value > 0 ? "+" : "";

    return `${sign}${value.toFixed(3)}%`;
};

const SetupEntryRow = ({
                           index,
                           price,
                           currentPrice,
                       }: SetupEntryRowProps) => {
    const distance =
        calculatePriceDistance({
            currentPrice,
            levelPrice: price,
        });

    const isPositive =
        distance !== null &&
        distance.percent > 0;

    const isNegative =
        distance !== null &&
        distance.percent < 0;

    return (
        <div
            className="
                grid
                min-w-0
                grid-cols-[24px_minmax(74px,1fr)_68px_minmax(82px,auto)]
                items-center
                gap-2
                py-1.5
            "
        >
            <span
                className="
                    flex
                    size-6
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--color-surface)]
                    text-xs
                    font-medium
                    text-[var(--color-text-secondary)]
                "
            >
                {index}
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
                    isPositive
                        ? "text-[var(--color-success)]"
                        : isNegative
                            ? "text-[var(--color-danger)]"
                            : "text-[var(--color-text-muted)]"
                }
                `}
            >
                {distance
                    ? formatSignedPercent(
                        distance.percent,
                    )
                    : "—"}
            </span>

            <span
                className="
                    min-w-0
                    overflow-hidden
                    text-ellipsis
                    whitespace-nowrap
                    text-right
                    font-mono
                    text-xs
                    tabular-nums
                    text-[var(--color-text-muted)]
                "
                title={
                    distance
                        ? `${Math.abs(
                            distance.priceDifference,
                        )} USDT`
                        : undefined
                }
            >
                {distance
                    ? `(${formatSetupPrice(
                        Math.abs(
                            distance.priceDifference,
                        ),
                    )} USDT)`
                    : "—"}
            </span>
        </div>
    );
};

export {SetupEntryRow};