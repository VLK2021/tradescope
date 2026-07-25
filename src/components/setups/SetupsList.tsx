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
                    bg-[var(--color-card)]
                    px-6
                    py-12
                    text-center
                "
            >
                <div
                    className="
                        flex
                        size-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[var(--color-background)]
                        text-[var(--color-text-muted)]
                    "
                >
                    <Inbox
                        className="size-6"
                        aria-hidden="true"
                    />
                </div>

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

                <p
                    className="
                        mt-2
                        max-w-md
                        text-sm
                        leading-6
                        text-[var(--color-text-secondary)]
                    "
                >
                    Створіть перший торговий
                    сетап за допомогою кнопки
                    у верхній частині
                    сторінки.
                </p>
            </div>
        );
    }

    return (
        <div
            className="
                grid
                items-start
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
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