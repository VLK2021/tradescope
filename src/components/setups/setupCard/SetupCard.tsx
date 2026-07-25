"use client";

import {
    useState,
} from "react";

import {
    DeleteSetupModal,
} from "@/src/components/modals/deleteSetup";
import {
    useTickerPrice,
} from "@/src/hooks/useTickerPrice";
import type {
    SetupItem,
} from "@/src/types/setup";

import {
    SetupCardHeader,
} from "./SetupCardHeader";
import {
    SetupCardNote,
} from "./SetupCardNote";
import {
    SetupCurrentPrice,
} from "./SetupCurrentPrice";
import {
    SetupLevelsSection,
} from "./SetupLevelsSection";
import {
    SetupPriceRow,
} from "./SetupPriceRow";

type SetupCardProps = {
    setup: SetupItem;
};

const SetupCard = ({
                       setup,
                   }: SetupCardProps) => {
    const [
        isDeleteModalOpen,
        setIsDeleteModalOpen,
    ] = useState(false);

    const {
        price: currentPrice,
        isLoading,
    } = useTickerPrice(
        setup.symbol,
    );

    return (
        <>
            <article
                className="
                    flex
                    min-w-0
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[var(--color-border)]
                    bg-[var(--color-card)]
                "
            >
                <SetupCardHeader
                    symbol={setup.symbol}
                    direction={
                        setup.direction
                    }
                    isActive={
                        setup.isActive
                    }
                    onDeleteAction={() => {
                        setIsDeleteModalOpen(
                            true,
                        );
                    }}
                />

                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        gap-5
                        px-4
                        py-4
                    "
                >
                    <SetupCurrentPrice
                        price={currentPrice}
                        isLoading={isLoading}
                    />

                    <SetupLevelsSection
                        title="Рівні входу"
                        labelPrefix="E"
                        prices={
                            setup.entries
                        }
                        currentPrice={
                            currentPrice
                        }
                        variant="entry"
                    />

                    <SetupLevelsSection
                        title="Take Profit"
                        labelPrefix="TP"
                        prices={
                            setup.takeProfits
                        }
                        currentPrice={
                            currentPrice
                        }
                        variant="takeProfit"
                    />

                    {setup.stopLoss ? (
                        <section>
                            <h3
                                className="
                                    mb-2.5
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.12em]
                                    text-[var(--color-text-secondary)]
                                "
                            >
                                Stop Loss
                            </h3>

                            <SetupPriceRow
                                label="SL"
                                price={
                                    setup.stopLoss
                                }
                                currentPrice={
                                    currentPrice
                                }
                                variant="stopLoss"
                            />
                        </section>
                    ) : null}
                </div>

                <SetupCardNote
                    note={setup.note}
                />
            </article>

            <DeleteSetupModal
                isOpen={
                    isDeleteModalOpen
                }
                setupId={setup.id}
                setupSymbol={
                    setup.symbol
                }
                onCloseAction={() => {
                    setIsDeleteModalOpen(
                        false,
                    );
                }}
            />
        </>
    );
};

export {SetupCard};