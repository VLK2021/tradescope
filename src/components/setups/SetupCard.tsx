"use client";

import {useState} from "react";
import {
    CalendarDays,
    CircleStop,
    Pencil,
    Target,
    Trash2,
    TrendingDown,
    TrendingUp,
} from "lucide-react";

import {useLanguage} from "@/src/context";
import {
    DeleteSetupModal,
} from "@/src/components/modals/deleteSetup";
import type {
    SetupItem,
} from "@/src/types/setup";

type SetupCardProps = {
    setup: SetupItem;
};

type PriceLevelProps = {
    index: number;
    value: string;
    prefix: string;
    variant:
        | "entry"
        | "target"
        | "stop";
};

const PriceLevel = ({
                        index,
                        value,
                        prefix,
                        variant,
                    }: PriceLevelProps) => {
    const variantClassName = {
        entry: `
            border-[var(--color-border)]
            bg-[var(--color-background)]
        `,
        target: `
            border-[color-mix(in_srgb,var(--color-success)_35%,var(--color-border))]
            bg-[color-mix(in_srgb,var(--color-success)_8%,var(--color-background))]
        `,
        stop: `
            border-[color-mix(in_srgb,var(--color-danger)_35%,var(--color-border))]
            bg-[color-mix(in_srgb,var(--color-danger)_8%,var(--color-background))]
        `,
    }[variant];

    return (
        <div
            className={`
                flex
                min-w-0
                items-center
                justify-between
                gap-3
                rounded-xl
                border
                px-3
                py-2.5
                ${variantClassName}
            `}
        >
            <span
                className="
                    shrink-0
                    text-xs
                    font-medium
                    uppercase
                    tracking-wide
                    text-[var(--color-text-muted)]
                "
            >
                {prefix}
                {index > 0
                    ? ` ${index}`
                    : ""}
            </span>

            <span
                className="
                    min-w-0
                    overflow-hidden
                    text-ellipsis
                    whitespace-nowrap
                    font-mono
                    text-sm
                    font-semibold
                    tabular-nums
                    text-[var(--color-text)]
                "
                title={value}
            >
                {value}
            </span>
        </div>
    );
};

const SetupCard = ({
                       setup,
                   }: SetupCardProps) => {
    const {locale} = useLanguage();

    const [
        isDeleteModalOpen,
        setIsDeleteModalOpen,
    ] = useState(false);

    const isLong =
        setup.direction === "LONG";

    const formattedDate =
        new Intl.DateTimeFormat(
            locale.common.locale,
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            },
        ).format(
            new Date(setup.createdAt),
        );

    return (
        <>
            <article
                className="
                    min-w-0
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[var(--color-border)]
                    bg-[var(--color-card)]
                "
            >
                <header
                    className="
                        flex
                        items-start
                        justify-between
                        gap-4
                        border-b
                        border-[var(--color-border)]
                        px-5
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
                                    text-xl
                                    font-semibold
                                    text-[var(--color-text)]
                                "
                                title={setup.symbol}
                            >
                                {setup.symbol}
                            </h2>

                            <span
                                className={`
                                    inline-flex
                                    items-center
                                    gap-1
                                    rounded-full
                                    px-2.5
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
                                        className="size-3.5"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <TrendingDown
                                        className="size-3.5"
                                        aria-hidden="true"
                                    />
                                )}

                                {setup.direction}
                            </span>

                            <span
                                className={`
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    px-2.5
                                    py-1
                                    text-xs
                                    font-medium
                                    ${
                                    setup.isActive
                                        ? `
                                                bg-[color-mix(in_srgb,var(--color-success)_10%,transparent)]
                                                text-[var(--color-success)]
                                            `
                                        : `
                                                bg-[var(--color-background)]
                                                text-[var(--color-text-muted)]
                                            `
                                }
                                `}
                            >
                                <span
                                    className={`
                                        size-1.5
                                        rounded-full
                                        ${
                                        setup.isActive
                                            ? "bg-[var(--color-success)]"
                                            : "bg-[var(--color-text-muted)]"
                                    }
                                    `}
                                />

                                {setup.isActive
                                    ? locale
                                        .setups
                                        .active
                                    : locale
                                        .setups
                                        .inactive}
                            </span>
                        </div>

                        <div
                            className="
                                mt-2
                                flex
                                items-center
                                gap-1.5
                                text-sm
                                text-[var(--color-text-muted)]
                            "
                        >
                            <CalendarDays
                                className="size-4"
                                aria-hidden="true"
                            />

                            <span>
                                {formattedDate}
                            </span>
                        </div>
                    </div>

                    <div
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-1
                        "
                    >
                        <button
                            type="button"
                            aria-label={
                                locale.setups
                                    .edit
                            }
                            title={
                                locale.setups
                                    .edit
                            }
                            disabled
                            className="
                                flex
                                size-9
                                items-center
                                justify-center
                                rounded-lg
                                text-[var(--color-text-muted)]
                                opacity-40
                            "
                        >
                            <Pencil
                                className="size-4"
                                aria-hidden="true"
                            />
                        </button>

                        <button
                            type="button"
                            aria-label={
                                locale.setups
                                    .delete
                            }
                            title={
                                locale.setups
                                    .delete
                            }
                            onClick={() =>
                                setIsDeleteModalOpen(
                                    true,
                                )
                            }
                            className="
                                flex
                                size-9
                                items-center
                                justify-center
                                rounded-lg
                                text-[var(--color-text-muted)]
                                transition-colors
                                hover:bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)]
                                hover:text-[var(--color-danger)]
                            "
                        >
                            <Trash2
                                className="size-4"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </header>

                <div
                    className="
                        grid
                        gap-5
                        px-5
                        py-5
                        md:grid-cols-2
                    "
                >
                    <section className="min-w-0">
                        <div
                            className="
                                mb-3
                                flex
                                items-center
                                justify-between
                                gap-3
                            "
                        >
                            <h3
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-semibold
                                    text-[var(--color-text)]
                                "
                            >
                                <TrendingUp
                                    className="
                                        size-4
                                        text-[var(--color-brand)]
                                    "
                                    aria-hidden="true"
                                />

                                {
                                    locale.setups
                                        .entries
                                }
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
                                {
                                    setup.entries
                                        .length
                                }
                            </span>
                        </div>

                        <div className="space-y-2">
                            {setup.entries.map(
                                (
                                    entry,
                                    index,
                                ) => (
                                    <PriceLevel
                                        key={`${setup.id}-entry-${index}`}
                                        index={
                                            index +
                                            1
                                        }
                                        value={
                                            entry
                                        }
                                        prefix="E"
                                        variant="entry"
                                    />
                                ),
                            )}
                        </div>
                    </section>

                    <section className="min-w-0">
                        <div
                            className="
                                mb-3
                                flex
                                items-center
                                justify-between
                                gap-3
                            "
                        >
                            <h3
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-semibold
                                    text-[var(--color-text)]
                                "
                            >
                                <Target
                                    className="
                                        size-4
                                        text-[var(--color-success)]
                                    "
                                    aria-hidden="true"
                                />

                                {
                                    locale.setups
                                        .takeProfits
                                }
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
                                {
                                    setup
                                        .takeProfits
                                        .length
                                }
                            </span>
                        </div>

                        <div className="space-y-2">
                            {setup.takeProfits.map(
                                (
                                    takeProfit,
                                    index,
                                ) => (
                                    <PriceLevel
                                        key={`${setup.id}-take-profit-${index}`}
                                        index={
                                            index +
                                            1
                                        }
                                        value={
                                            takeProfit
                                        }
                                        prefix="TP"
                                        variant="target"
                                    />
                                ),
                            )}
                        </div>
                    </section>
                </div>

                {setup.stopLoss ||
                setup.note ? (
                    <footer
                        className="
                            space-y-4
                            border-t
                            border-[var(--color-border)]
                            px-5
                            py-4
                        "
                    >
                        {setup.stopLoss ? (
                            <section>
                                <h3
                                    className="
                                        mb-2
                                        flex
                                        items-center
                                        gap-2
                                        text-sm
                                        font-semibold
                                        text-[var(--color-text)]
                                    "
                                >
                                    <CircleStop
                                        className="
                                            size-4
                                            text-[var(--color-danger)]
                                        "
                                        aria-hidden="true"
                                    />

                                    {
                                        locale
                                            .setups
                                            .stopLoss
                                    }
                                </h3>

                                <PriceLevel
                                    index={0}
                                    value={
                                        setup.stopLoss
                                    }
                                    prefix="SL"
                                    variant="stop"
                                />
                            </section>
                        ) : null}

                        {setup.note ? (
                            <section>
                                <h3
                                    className="
                                        mb-2
                                        text-sm
                                        font-semibold
                                        text-[var(--color-text)]
                                    "
                                >
                                    {
                                        locale
                                            .setups
                                            .note
                                    }
                                </h3>

                                <p
                                    className="
                                        whitespace-pre-wrap
                                        break-words
                                        text-sm
                                        leading-6
                                        text-[var(--color-text-secondary)]
                                    "
                                >
                                    {setup.note}
                                </p>
                            </section>
                        ) : null}
                    </footer>
                ) : null}
            </article>

            <DeleteSetupModal
                isOpen={isDeleteModalOpen}
                setupId={setup.id}
                setupSymbol={setup.symbol}
                onCloseAction={() =>
                    setIsDeleteModalOpen(
                        false,
                    )
                }
            />
        </>
    );
};

export {SetupCard};