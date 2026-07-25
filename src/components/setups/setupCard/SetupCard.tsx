"use client";

import {
    useState,
} from "react";
import {
    useRouter,
} from "next/navigation";

import {
    DeleteSetupModal,
} from "@/src/components/modals/deleteSetup";
import {
    formatSetupPrice,
} from "@/src/helpers/formatSetupPrice";
import {
    useTickerPrice,
} from "@/src/hooks/useTickerPrice";
import type {
    SetupItem,
} from "@/src/types/setup";

import {
    SetupCardActions,
} from "./SetupCardActions";
import {
    SetupCardHeader,
} from "./SetupCardHeader";
import {
    SetupCardMeta,
} from "./SetupCardMeta";
import {
    SetupEntries,
} from "./SetupEntries";
import {
    SetupTargets,
} from "./SetupTargets";

type SetupCardProps = {
    setup: SetupItem;
};

const SetupCard = ({
                       setup,
                   }: SetupCardProps) => {
    const router = useRouter();

    const [
        isDeleteModalOpen,
        setIsDeleteModalOpen,
    ] = useState(false);

    const [
        isActive,
        setIsActive,
    ] = useState(setup.isActive);

    const [
        isUpdatingStatus,
        setIsUpdatingStatus,
    ] = useState(false);

    const [
        statusError,
        setStatusError,
    ] = useState("");

    const {
        price: currentPrice,
        isLoading,
    } = useTickerPrice(
        setup.symbol,
    );

    const handleToggleStatus =
        async (): Promise<void> => {
            if (isUpdatingStatus) {
                return;
            }

            const previousStatus =
                isActive;

            const nextStatus =
                !previousStatus;

            setStatusError("");
            setIsActive(nextStatus);
            setIsUpdatingStatus(true);

            try {
                const response =
                    await fetch(
                        `/api/setups/${setup.id}`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type":
                                    "application/json",
                            },
                            body: JSON.stringify({
                                isActive:
                                nextStatus,
                            }),
                        },
                    );

                if (!response.ok) {
                    throw new Error(
                        "Failed to update setup status",
                    );
                }

                router.refresh();
            } catch {
                setIsActive(
                    previousStatus,
                );

                setStatusError(
                    "Не вдалося змінити статус сетапу",
                );
            } finally {
                setIsUpdatingStatus(
                    false,
                );
            }
        };

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
                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        gap-4
                        px-4
                        pt-4
                        pb-3
                    "
                >
                    <SetupCardHeader
                        symbol={setup.symbol}
                        direction={
                            setup.direction
                        }
                        isActive={isActive}
                        isUpdatingStatus={
                            isUpdatingStatus
                        }
                        onToggleStatusAction={
                            handleToggleStatus
                        }
                    />

                    {statusError ? (
                        <p
                            role="alert"
                            className="
                                rounded-lg
                                border
                                border-[color-mix(in_srgb,var(--color-danger)_25%,transparent)]
                                bg-[color-mix(in_srgb,var(--color-danger)_8%,transparent)]
                                px-3
                                py-2
                                text-xs
                                text-[var(--color-danger)]
                            "
                        >
                            {statusError}
                        </p>
                    ) : null}

                    <div
                        className="
                            flex
                            min-w-0
                            items-baseline
                            gap-2
                        "
                    >
                        <span
                            className="
                                shrink-0
                                text-sm
                                text-[var(--color-text-muted)]
                            "
                        >
                            Поточна ціна
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
                                text-[var(--color-text-secondary)]
                            "
                            title={
                                currentPrice ===
                                null
                                    ? undefined
                                    : String(
                                        currentPrice,
                                    )
                            }
                        >
                            {isLoading
                                ? "—"
                                : formatSetupPrice(
                                    currentPrice,
                                )}
                        </span>

                        <span
                            className={`
                                size-1.5
                                shrink-0
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
                            title={
                                isLoading
                                    ? "Підключення"
                                    : "Live"
                            }
                        />
                    </div>

                    <SetupEntries
                        entries={
                            setup.entries
                        }
                        currentPrice={
                            currentPrice
                        }
                    />

                    <SetupTargets
                        stopLoss={
                            setup.stopLoss
                        }
                        takeProfits={
                            setup.takeProfits
                        }
                    />

                    <SetupCardMeta
                        note={setup.note}
                        createdAt={
                            setup.createdAt
                        }
                    />
                </div>

                <SetupCardActions
                    onDeleteAction={() => {
                        setIsDeleteModalOpen(
                            true,
                        );
                    }}
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