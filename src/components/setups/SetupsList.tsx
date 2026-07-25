import {
    Inbox,
} from "lucide-react";

import type {
    SetupItem,
} from "@/src/types/setup";

import {
    SetupCard,
} from "./setupCard";

type SetupsListProps = {
    setups: SetupItem[];
};

const SetupsList = ({
                        setups,
                    }: SetupsListProps) => {
    if (setups.length === 0) {
        return (
            <div
                className="
                    flex
                    min-h-72
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-[var(--color-border)]
                    px-6
                    py-12
                    text-center
                "
            >
                <Inbox
                    className="
                        size-7
                        text-[var(--color-text-muted)]
                    "
                    aria-hidden="true"
                />

                <h2
                    className="
                        mt-4
                        text-lg
                        font-semibold
                        text-[var(--color-text)]
                    "
                >
                    Сетапів поки немає
                </h2>
            </div>
        );
    }

    return (
        <div
            className="
                grid
                items-start
                gap-4
                md:grid-cols-2
                xl:grid-cols-3
            "
        >
            {setups.map((setup) => (
                <SetupCard
                    key={setup.id}
                    setup={setup}
                />
            ))}
        </div>
    );
};

export {SetupsList};