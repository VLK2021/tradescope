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
                Входи
            </h3>

            <div className="space-y-0">
                {entries.map(
                    (entry, index) => (
                        <SetupEntryRow
                            key={`${entry}-${index}`}
                            index={index + 1}
                            price={entry}
                            currentPrice={
                                currentPrice
                            }
                        />
                    ),
                )}
            </div>
        </section>
    );
};

export {SetupEntries};