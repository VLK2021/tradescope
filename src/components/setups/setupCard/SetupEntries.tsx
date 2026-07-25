"use client";

import {
    useLanguage,
} from "@/src/context";

import {
    SetupEntryRow,
} from "./SetupEntryRow";

type SetupEntriesProps = {
    entries: string[];
    currentPrice: number | null;
};

const SetupEntries = ({
                          entries,
                          currentPrice,
                      }: SetupEntriesProps) => {
    const {locale} = useLanguage();

    return (
        <section
            className="
                border-t
                border-[var(--color-border)]
                pt-2.5
            "
        >
            <h3
                className="
                    mb-1
                    text-sm
                    font-medium
                    text-[var(--color-text-secondary)]
                "
            >
                {locale.setups.entries}
            </h3>

            <div>
                {entries.map(
                    (entry, index) => (
                        <SetupEntryRow
                            key={`${entry}-${index}`}
                            index={index + 1}
                            price={entry}
                            currentPrice={
                                currentPrice
                            }
                            currency={
                                locale.setups
                                    .currency
                            }
                        />
                    ),
                )}
            </div>
        </section>
    );
};

export {SetupEntries};