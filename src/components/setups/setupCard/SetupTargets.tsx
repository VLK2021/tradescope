import {
    formatSetupPrice,
} from "@/src/helpers/formatSetupPrice";

type SetupTargetsProps = {
    stopLoss: string | null;
    takeProfits: string[];
};

const SetupTargets = ({
                          stopLoss,
                          takeProfits,
                      }: SetupTargetsProps) => {
    if (
        !stopLoss &&
        takeProfits.length === 0
    ) {
        return null;
    }

    return (
        <section
            className="
                grid
                grid-cols-[minmax(88px,0.7fr)_minmax(0,1.8fr)]
                gap-5
                border-t
                border-[var(--color-border)]
                pt-4
            "
        >
            <div className="min-w-0">
                <h3
                    className="
                        text-sm
                        font-semibold
                        uppercase
                        text-[var(--color-danger)]
                    "
                >
                    SL
                </h3>

                <p
                    className="
                        mt-1
                        min-w-0
                        overflow-hidden
                        text-ellipsis
                        whitespace-nowrap
                        font-mono
                        text-sm
                        font-semibold
                        tabular-nums
                        text-[var(--color-danger)]
                    "
                    title={
                        stopLoss ??
                        undefined
                    }
                >
                    {stopLoss
                        ? formatSetupPrice(
                            stopLoss,
                        )
                        : "—"}
                </p>
            </div>

            <div className="min-w-0">
                <h3
                    className="
                        text-sm
                        font-semibold
                        uppercase
                        text-[var(--color-text-secondary)]
                    "
                >
                    TP
                </h3>

                <p
                    className="
                        mt-1
                        min-w-0
                        break-words
                        font-mono
                        text-sm
                        font-semibold
                        leading-6
                        tabular-nums
                        text-[var(--color-success)]
                    "
                    title={takeProfits.join(
                        " / ",
                    )}
                >
                    {takeProfits.length > 0
                        ? takeProfits
                            .map(
                                formatSetupPrice,
                            )
                            .join(" / ")
                        : "—"}
                </p>
            </div>
        </section>
    );
};

export {SetupTargets};