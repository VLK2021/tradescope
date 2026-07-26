"use client";

import {
    type ChangeEvent,
    type FormEvent,
    useEffect,
    useState,
    useTransition,
} from "react";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import {
    RotateCcw,
    Search,
} from "lucide-react";

type SetupFiltersProps = {
    symbol: string;
    status:
        | "all"
        | "active"
        | "inactive";
    direction:
        | "all"
        | "LONG"
        | "SHORT";
    sort:
        | "createdAt"
        | "updatedAt"
        | "symbol";
    order:
        | "asc"
        | "desc";
};

const SetupFilters = ({
                          symbol,
                          status,
                          direction,
                          sort,
                          order,
                      }: SetupFiltersProps) => {
    const router =
        useRouter();

    const pathname =
        usePathname();

    const searchParams =
        useSearchParams();

    const [
        searchValue,
        setSearchValue,
    ] = useState(symbol);

    const [
        isPending,
        startTransition,
    ] = useTransition();

    useEffect(() => {
        setSearchValue(
            symbol,
        );
    }, [
        symbol,
    ]);

    const updateSearchParams = (
        updates: Record<
            string,
            string | null
        >,
    ): void => {
        const params =
            new URLSearchParams(
                searchParams.toString(),
            );

        Object.entries(
            updates,
        ).forEach(
            ([
                 key,
                 value,
             ]) => {
                if (
                    value === null ||
                    value === ""
                ) {
                    params.delete(
                        key,
                    );

                    return;
                }

                params.set(
                    key,
                    value,
                );
            },
        );

        params.delete(
            "page",
        );

        startTransition(() => {
            const queryString =
                params.toString();

            router.push(
                queryString
                    ? `${pathname}?${queryString}`
                    : pathname,
                {
                    scroll: false,
                },
            );
        });
    };

    const handleSearchSubmit = (
        event: FormEvent<HTMLFormElement>,
    ): void => {
        event.preventDefault();

        updateSearchParams({
            symbol:
                searchValue
                    .trim()
                    .toUpperCase() ||
                null,
        });
    };

    const handleStatusChange = (
        event: ChangeEvent<HTMLSelectElement>,
    ): void => {
        const value =
            event.target.value;

        updateSearchParams({
            status:
                value === "all"
                    ? null
                    : value,
        });
    };

    const handleDirectionChange = (
        event: ChangeEvent<HTMLSelectElement>,
    ): void => {
        const value =
            event.target.value;

        updateSearchParams({
            direction:
                value === "all"
                    ? null
                    : value,
        });
    };

    const handleSortChange = (
        event: ChangeEvent<HTMLSelectElement>,
    ): void => {
        const value =
            event.target.value;

        updateSearchParams({
            sort:
                value ===
                "createdAt"
                    ? null
                    : value,
        });
    };

    const handleOrderChange = (
        event: ChangeEvent<HTMLSelectElement>,
    ): void => {
        const value =
            event.target.value;

        updateSearchParams({
            order:
                value === "desc"
                    ? null
                    : value,
        });
    };

    const handleReset = (): void => {
        setSearchValue("");

        startTransition(() => {
            router.push(
                pathname,
                {
                    scroll: false,
                },
            );
        });
    };

    const hasChangedFilters =
        Boolean(symbol) ||
        status !== "all" ||
        direction !== "all" ||
        sort !== "createdAt" ||
        order !== "desc";

    return (
        <section
            aria-label="Фільтрація та сортування сетапів"
            className="
                mb-6
                rounded-2xl
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                p-4
                sm:p-5
            "
        >
            <div
                className="
                    grid
                    gap-3
                    md:grid-cols-2
                    xl:grid-cols-[minmax(240px,1.5fr)_minmax(150px,0.8fr)_minmax(150px,0.8fr)_minmax(180px,1fr)_minmax(150px,0.8fr)_auto]
                "
            >
                <form
                    onSubmit={
                        handleSearchSubmit
                    }
                    className="
                        flex
                        min-w-0
                        items-center
                        rounded-xl
                        border
                        border-[var(--color-border)]
                        bg-[var(--color-background)]
                        transition-colors
                        focus-within:border-[var(--color-brand)]
                    "
                >
                    <Search
                        className="
                            ml-3
                            size-4
                            shrink-0
                            text-[var(--color-text-muted)]
                        "
                        aria-hidden="true"
                    />

                    <label
                        htmlFor="setup-symbol-search"
                        className="sr-only"
                    >
                        Пошук за тикером
                    </label>

                    <input
                        id="setup-symbol-search"
                        type="search"
                        value={
                            searchValue
                        }
                        disabled={
                            isPending
                        }
                        onChange={(
                            event,
                        ) => {
                            setSearchValue(
                                event
                                    .target
                                    .value
                                    .toUpperCase(),
                            );
                        }}
                        placeholder="Пошук за тикером"
                        className="
                            h-11
                            min-w-0
                            flex-1
                            bg-transparent
                            px-3
                            text-sm
                            text-[var(--color-text)]
                            outline-none
                            placeholder:text-[var(--color-text-muted)]
                            disabled:cursor-wait
                        "
                    />

                    <button
                        type="submit"
                        disabled={
                            isPending
                        }
                        className="
                            mr-1
                            flex
                            h-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-[var(--color-brand)]
                            px-3
                            text-xs
                            font-medium
                            text-white
                            transition-colors
                            hover:bg-[var(--color-brand-hover)]
                            disabled:cursor-wait
                            disabled:opacity-60
                        "
                    >
                        Знайти
                    </button>
                </form>

                <div>
                    <label
                        htmlFor="setup-status-filter"
                        className="sr-only"
                    >
                        Статус
                    </label>

                    <select
                        id="setup-status-filter"
                        value={
                            status
                        }
                        disabled={
                            isPending
                        }
                        onChange={
                            handleStatusChange
                        }
                        className="
                            h-11
                            w-full
                            cursor-pointer
                            rounded-xl
                            border
                            border-[var(--color-border)]
                            bg-[var(--color-background)]
                            px-3
                            text-sm
                            text-[var(--color-text)]
                            outline-none
                            transition-colors
                            focus:border-[var(--color-brand)]
                            disabled:cursor-wait
                            disabled:opacity-60
                        "
                    >
                        <option value="all">
                            Усі статуси
                        </option>

                        <option value="active">
                            Активні
                        </option>

                        <option value="inactive">
                            Неактивні
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="setup-direction-filter"
                        className="sr-only"
                    >
                        Напрямок
                    </label>

                    <select
                        id="setup-direction-filter"
                        value={
                            direction
                        }
                        disabled={
                            isPending
                        }
                        onChange={
                            handleDirectionChange
                        }
                        className="
                            h-11
                            w-full
                            cursor-pointer
                            rounded-xl
                            border
                            border-[var(--color-border)]
                            bg-[var(--color-background)]
                            px-3
                            text-sm
                            text-[var(--color-text)]
                            outline-none
                            transition-colors
                            focus:border-[var(--color-brand)]
                            disabled:cursor-wait
                            disabled:opacity-60
                        "
                    >
                        <option value="all">
                            LONG і SHORT
                        </option>

                        <option value="LONG">
                            LONG
                        </option>

                        <option value="SHORT">
                            SHORT
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="setup-sort-filter"
                        className="sr-only"
                    >
                        Сортування
                    </label>

                    <select
                        id="setup-sort-filter"
                        value={
                            sort
                        }
                        disabled={
                            isPending
                        }
                        onChange={
                            handleSortChange
                        }
                        className="
                            h-11
                            w-full
                            cursor-pointer
                            rounded-xl
                            border
                            border-[var(--color-border)]
                            bg-[var(--color-background)]
                            px-3
                            text-sm
                            text-[var(--color-text)]
                            outline-none
                            transition-colors
                            focus:border-[var(--color-brand)]
                            disabled:cursor-wait
                            disabled:opacity-60
                        "
                    >
                        <option value="createdAt">
                            За датою створення
                        </option>

                        <option value="updatedAt">
                            За датою оновлення
                        </option>

                        <option value="symbol">
                            За тикером
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="setup-order-filter"
                        className="sr-only"
                    >
                        Порядок сортування
                    </label>

                    <select
                        id="setup-order-filter"
                        value={
                            order
                        }
                        disabled={
                            isPending
                        }
                        onChange={
                            handleOrderChange
                        }
                        className="
                            h-11
                            w-full
                            cursor-pointer
                            rounded-xl
                            border
                            border-[var(--color-border)]
                            bg-[var(--color-background)]
                            px-3
                            text-sm
                            text-[var(--color-text)]
                            outline-none
                            transition-colors
                            focus:border-[var(--color-brand)]
                            disabled:cursor-wait
                            disabled:opacity-60
                        "
                    >
                        <option value="desc">
                            За спаданням
                        </option>

                        <option value="asc">
                            За зростанням
                        </option>
                    </select>
                </div>

                <button
                    type="button"
                    disabled={
                        !hasChangedFilters ||
                        isPending
                    }
                    onClick={
                        handleReset
                    }
                    className="
                        flex
                        h-11
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-[var(--color-border)]
                        px-4
                        text-sm
                        font-medium
                        text-[var(--color-text-secondary)]
                        transition-colors
                        hover:bg-[var(--color-background)]
                        hover:text-[var(--color-text)]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    <RotateCcw
                        className="size-4"
                        aria-hidden="true"
                    />

                    Скинути
                </button>
            </div>

            {isPending ? (
                <p
                    className="
                        mt-3
                        text-xs
                        text-[var(--color-text-muted)]
                    "
                >
                    Оновлення результатів...
                </p>
            ) : null}
        </section>
    );
};

export {
    SetupFilters,
};