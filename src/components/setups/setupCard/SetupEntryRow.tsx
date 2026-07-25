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

const formatEntryPercent = (
    percent: number,
): string => {
    return `${percent.toFixed(2)}%`;
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
            levelType: "entry",
        });

    return (
        <div
            className="
                grid
                min-w-0
                grid-cols-[28px_minmax(0,1fr)_90px]
                items-center
                gap-x-3
                gap-y-1
                py-2
            "
        >
            <span
                className="
                    flex
                    size-7
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
                    text-base
                    font-medium
                    tabular-nums
                    text-[var(--color-text)]
                "
                title={price}
            >
                {formatSetupPrice(price)}
            </span>

            <span
                className="
                    text-right
                    font-mono
                    text-base
                    font-semibold
                    tabular-nums
                    text-[var(--color-danger)]
                "
            >
                {distance
                    ? formatEntryPercent(
                        distance.percent,
                    )
                    : "—"}
            </span>

            <span
                className="
                    col-start-2
                    col-end-4
                    text-right
                    font-mono
                    text-sm
                    tabular-nums
                    text-[var(--color-text-muted)]
                "
            >
                {distance
                    ? `(${formatSetupPrice(
                        distance.priceDifference,
                    )} USDT)`
                    : null}
            </span>
        </div>
    );
};

export {SetupEntryRow};