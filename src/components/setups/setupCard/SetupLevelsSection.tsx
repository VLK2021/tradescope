import {
    SetupPriceRow,
    type SetupPriceRowVariant,
} from "./SetupPriceRow";

type SetupLevelsSectionProps = {
    title: string;
    labelPrefix: string;
    prices: string[];
    currentPrice: number | null;
    variant: SetupPriceRowVariant;
};

const SetupLevelsSection = ({
                                title,
                                labelPrefix,
                                prices,
                                currentPrice,
                                variant,
                            }: SetupLevelsSectionProps) => {
    if (prices.length === 0) {
        return null;
    }

    return (
        <section className="min-w-0">
            <div
                className="
                    mb-2.5
                    flex
                    items-center
                    justify-between
                    gap-3
                "
            >
                <h3
                    className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-[var(--color-text-secondary)]
                    "
                >
                    {title}
                </h3>

                <span
                    className="
                        rounded-full
                        bg-[var(--color-background)]
                        px-2
                        py-0.5
                        text-xs
                        font-medium
                        text-[var(--color-text-muted)]
                    "
                >
                    {prices.length}
                </span>
            </div>

            <div className="space-y-2">
                {prices.map(
                    (
                        price,
                        index,
                    ) => (
                        <SetupPriceRow
                            key={`${labelPrefix}-${index}-${price}`}
                            label={`${labelPrefix}${index + 1}`}
                            price={price}
                            currentPrice={
                                currentPrice
                            }
                            variant={variant}
                        />
                    ),
                )}
            </div>
        </section>
    );
};

export {SetupLevelsSection};