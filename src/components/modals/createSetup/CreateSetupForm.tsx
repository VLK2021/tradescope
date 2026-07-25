"use client";

import {
    useEffect,
    useState,
} from "react";
import {
    Controller,
    useFieldArray,
    useForm,
} from "react-hook-form";
import {
    Plus,
    Trash2,
    X,
} from "lucide-react";

import { useRouter } from "next/navigation";


import {useLanguage} from "@/src/context";
import {SearchableSelect, SearchableSelectOption} from "@/src/common/searchableSelect/input";

type CreateSetupFormValues = {
    symbol: string;
    direction: "LONG" | "SHORT";
    isActive: boolean;
    entries: Array<{
        value: string;
    }>;
    takeProfits: Array<{
        value: string;
    }>;
    stopLoss: string;
    note: string;
};

type BinanceSymbolResponseItem = {
    symbol: string;
};

type CreateSetupFormProps = {
    onSuccessAction: () => void;
    onCancelAction: () => void;
};

const PRICE_PATTERN =
    /^(?:0|[1-9]\d*)(?:\.\d{1,9})?$/;

const MAX_LEVELS = 10;

const getResponseMessage = (
    responseBody: unknown,
    fallback: string,
) => {
    if (
        typeof responseBody === "object" &&
        responseBody !== null &&
        "message" in responseBody &&
        typeof responseBody.message === "string"
    ) {
        return responseBody.message;
    }

    return fallback;
};

const CreateSetupForm = ({
                             onSuccessAction,
                             onCancelAction,
                         }: CreateSetupFormProps) => {
    const {locale} = useLanguage();

    const router = useRouter();

    const [symbolOptions, setSymbolOptions] =
        useState<SearchableSelectOption[]>([]);

    const [isSymbolsLoading, setIsSymbolsLoading] =
        useState(true);

    const [symbolsError, setSymbolsError] =
        useState("");

    const [submitError, setSubmitError] =
        useState("");

    const {
        control,
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<CreateSetupFormValues>({
        defaultValues: {
            symbol: "",
            direction: "LONG",
            isActive: true,
            entries: [
                {
                    value: "",
                },
            ],
            takeProfits: [
                {
                    value: "",
                },
            ],
            stopLoss: "",
            note: "",
        },
    });

    const {
        fields: entryFields,
        append: appendEntry,
        remove: removeEntry,
    } = useFieldArray({
        control,
        name: "entries",
    });

    const {
        fields: takeProfitFields,
        append: appendTakeProfit,
        remove: removeTakeProfit,
    } = useFieldArray({
        control,
        name: "takeProfits",
    });

    const validatePrice = (
        value: string,
        required: boolean,
    ) => {
        const normalizedValue =
            value.trim();

        if (!normalizedValue) {
            return required
                ? locale.createSetup.priceRequired
                : true;
        }

        if (
            !PRICE_PATTERN.test(
                normalizedValue,
            )
        ) {
            return locale.createSetup.priceInvalid;
        }

        if (Number(normalizedValue) <= 0) {
            return locale.createSetup.pricePositive;
        }

        return true;
    };

    useEffect(() => {
        const controller =
            new AbortController();

        const loadSymbols = async () => {
            try {
                setIsSymbolsLoading(true);
                setSymbolsError("");

                const response = await fetch(
                    "/api/binance/symbols",
                    {
                        method: "GET",
                        signal: controller.signal,
                    },
                );

                const responseBody: unknown =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        getResponseMessage(
                            responseBody,
                            locale.createSetup
                                .symbolsLoadError,
                        ),
                    );
                }

                const symbols =
                    Array.isArray(responseBody)
                        ? responseBody
                        : typeof responseBody ===
                        "object" &&
                        responseBody !==
                        null &&
                        "data" in
                        responseBody &&
                        Array.isArray(
                            responseBody.data,
                        )
                            ? responseBody.data
                            : [];

                const options = symbols
                    .filter(
                        (
                            item,
                        ): item is BinanceSymbolResponseItem =>
                            typeof item ===
                            "object" &&
                            item !== null &&
                            "symbol" in item &&
                            typeof item.symbol ===
                            "string",
                    )
                    .map((item) => ({
                        value: item.symbol,
                        label: item.symbol,
                    }));

                setSymbolOptions(options);
            } catch (error) {
                if (
                    error instanceof
                    DOMException &&
                    error.name ===
                    "AbortError"
                ) {
                    return;
                }

                setSymbolsError(
                    error instanceof Error
                        ? error.message
                        : locale.createSetup
                            .symbolsLoadError,
                );
            } finally {
                setIsSymbolsLoading(false);
            }
        };

        void loadSymbols();

        return () => {
            controller.abort();
        };
    }, [
        locale.createSetup.symbolsLoadError,
    ]);

    const handleCreateSetup = async (
        values: CreateSetupFormValues,
    ) => {
        setSubmitError("");

        const payload = {
            symbol: values.symbol,
            direction: values.direction,
            isActive: values.isActive,
            entries: values.entries.map(
                (entry) =>
                    entry.value.trim(),
            ),
            takeProfits:
                values.takeProfits.map(
                    (takeProfit) =>
                        takeProfit.value.trim(),
                ),
            stopLoss:
                values.stopLoss.trim() ||
                null,
            note:
                values.note.trim() || null,
        };

        try {
            const response = await fetch(
                "/api/setups",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(
                        payload,
                    ),
                },
            );

            const responseBody: unknown =
                await response.json();

            if (response.status !== 201) {
                setSubmitError(
                    getResponseMessage(
                        responseBody,
                        locale.createSetup
                            .createError,
                    ),
                );

                return;
            }

            reset();
            onSuccessAction();
            router.refresh();
        } catch {
            setSubmitError(
                locale.createSetup
                    .connectionError,
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(
                handleCreateSetup,
            )}
            className="space-y-6"
        >
            <section className="space-y-5">
                <Controller
                    name="symbol"
                    control={control}
                    rules={{
                        required:
                        locale.createSetup
                            .symbolRequired,
                    }}
                    render={({field}) => (
                        <SearchableSelect
                            label={
                                locale.createSetup
                                    .symbolLabel
                            }
                            options={
                                symbolOptions
                            }
                            value={field.value}
                            onChangeAction={
                                field.onChange
                            }
                            placeholder={
                                locale.createSetup
                                    .symbolPlaceholder
                            }
                            noOptionsMessage={
                                locale.createSetup
                                    .symbolNoOptions
                            }
                            loadingMessage={
                                locale.createSetup
                                    .symbolLoading
                            }
                            error={
                                errors.symbol
                                    ?.message ??
                                symbolsError
                            }
                            isLoading={
                                isSymbolsLoading
                            }
                            isDisabled={
                                isSubmitting
                            }
                            isRequired
                        />
                    )}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                    <fieldset>
                        <legend className="mb-2 text-sm font-medium text-[var(--color-text)]">
                            {
                                locale.createSetup
                                    .directionLabel
                            }

                            <span className="ml-1 text-[var(--color-danger)]">
                                *
                            </span>
                        </legend>

                        <div className="grid grid-cols-2 gap-2">
                            <label className="cursor-pointer">
                                <input
                                    type="radio"
                                    value="LONG"
                                    className="peer sr-only"
                                    {...register(
                                        "direction",
                                    )}
                                />

                                <span
                                    className="
                                        flex
                                        h-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-[var(--color-border)]
                                        bg-[var(--color-background)]
                                        text-sm
                                        font-medium
                                        text-[var(--color-text-secondary)]
                                        transition-colors
                                        peer-checked:border-[var(--color-success)]
                                        peer-checked:text-[var(--color-success)]
                                    "
                                >
                                    LONG
                                </span>
                            </label>

                            <label className="cursor-pointer">
                                <input
                                    type="radio"
                                    value="SHORT"
                                    className="peer sr-only"
                                    {...register(
                                        "direction",
                                    )}
                                />

                                <span
                                    className="
                                        flex
                                        h-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-[var(--color-border)]
                                        bg-[var(--color-background)]
                                        text-sm
                                        font-medium
                                        text-[var(--color-text-secondary)]
                                        transition-colors
                                        peer-checked:border-[var(--color-danger)]
                                        peer-checked:text-[var(--color-danger)]
                                    "
                                >
                                    SHORT
                                </span>
                            </label>
                        </div>
                    </fieldset>

                    <div>
                        <span className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                            {
                                locale.createSetup
                                    .statusLabel
                            }
                        </span>

                        <label
                            className="
                                flex
                                h-11
                                cursor-pointer
                                items-center
                                justify-between
                                gap-4
                                rounded-xl
                                border
                                border-[var(--color-border)]
                                bg-[var(--color-background)]
                                px-3
                            "
                        >
                            <span className="text-sm text-[var(--color-text-secondary)]">
                                {
                                    locale.createSetup
                                        .activeSetup
                                }
                            </span>

                            <input
                                type="checkbox"
                                className="size-4 accent-[var(--color-brand)]"
                                {...register(
                                    "isActive",
                                )}
                            />
                        </label>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h3 className="font-semibold text-[var(--color-text)]">
                            {
                                locale.createSetup
                                    .entriesTitle
                            }
                        </h3>

                        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                            {
                                locale.createSetup
                                    .entriesDescription
                            }
                        </p>
                    </div>

                    <button
                        type="button"
                        disabled={
                            entryFields.length >=
                            MAX_LEVELS ||
                            isSubmitting
                        }
                        onClick={() =>
                            appendEntry({
                                value: "",
                            })
                        }
                        className="
                            flex
                            h-9
                            items-center
                            justify-center
                            gap-1.5
                            rounded-lg
                            border
                            border-[var(--color-border)]
                            px-3
                            text-sm
                            font-medium
                            text-[var(--color-text-secondary)]
                            transition-colors
                            hover:bg-[var(--color-background)]
                            hover:text-[var(--color-text)]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <Plus
                            className="size-4"
                            aria-hidden="true"
                        />

                        {
                            locale.createSetup
                                .addEntry
                        }
                    </button>
                </div>

                <div className="space-y-3">
                    {entryFields.map(
                        (field, index) => (
                            <div
                                key={field.id}
                                className="flex items-start gap-2"
                            >
                                <div className="min-w-0 flex-1">
                                    <label
                                        htmlFor={`entry-${index}`}
                                        className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                                    >
                                        {
                                            locale
                                                .createSetup
                                                .entryLabel
                                        }{" "}
                                        {index + 1}
                                    </label>

                                    <div className="relative">
                                        <input
                                            id={`entry-${index}`}
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0.000000000"
                                            disabled={
                                                isSubmitting
                                            }
                                            {...register(
                                                `entries.${index}.value`,
                                                {
                                                    validate:
                                                        (
                                                            value,
                                                        ) =>
                                                            validatePrice(
                                                                value,
                                                                true,
                                                            ),
                                                },
                                            )}
                                            className="
                                                h-11
                                                w-full
                                                rounded-xl
                                                border
                                                border-[var(--color-border)]
                                                bg-[var(--color-background)]
                                                px-3
                                                pr-10
                                                text-sm
                                                text-[var(--color-text)]
                                                outline-none
                                                transition-colors
                                                placeholder:text-[var(--color-text-muted)]
                                                focus:border-[var(--color-brand)]
                                            "
                                        />

                                        <button
                                            type="button"
                                            aria-label={
                                                locale
                                                    .createSetup
                                                    .clearEntry
                                            }
                                            onClick={() =>
                                                setValue(
                                                    `entries.${index}.value`,
                                                    "",
                                                    {
                                                        shouldValidate:
                                                            true,
                                                    },
                                                )
                                            }
                                            className="
                                                absolute
                                                right-1
                                                top-1/2
                                                flex
                                                size-9
                                                -translate-y-1/2
                                                items-center
                                                justify-center
                                                rounded-lg
                                                text-[var(--color-text-muted)]
                                                hover:bg-[var(--color-surface)]
                                                hover:text-[var(--color-text)]
                                            "
                                        >
                                            <X
                                                className="size-4"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>

                                    {errors.entries?.[
                                        index
                                        ]?.value?.message ? (
                                        <p className="mt-1.5 text-sm text-[var(--color-danger)]">
                                            {
                                                errors
                                                    .entries[
                                                    index
                                                    ]?.value
                                                    ?.message
                                            }
                                        </p>
                                    ) : null}
                                </div>

                                <button
                                    type="button"
                                    aria-label={
                                        locale.createSetup
                                            .deleteEntry
                                    }
                                    disabled={
                                        entryFields.length ===
                                        1 ||
                                        isSubmitting
                                    }
                                    onClick={() =>
                                        removeEntry(
                                            index,
                                        )
                                    }
                                    className="
                                        mt-7
                                        flex
                                        size-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-[var(--color-border)]
                                        text-[var(--color-text-muted)]
                                        transition-colors
                                        hover:border-[var(--color-danger)]
                                        hover:text-[var(--color-danger)]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-40
                                    "
                                >
                                    <Trash2
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        ),
                    )}
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h3 className="font-semibold text-[var(--color-text)]">
                            {
                                locale.createSetup
                                    .takeProfitsTitle
                            }
                        </h3>

                        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                            {
                                locale.createSetup
                                    .takeProfitsDescription
                            }
                        </p>
                    </div>

                    <button
                        type="button"
                        disabled={
                            takeProfitFields.length >=
                            MAX_LEVELS ||
                            isSubmitting
                        }
                        onClick={() =>
                            appendTakeProfit({
                                value: "",
                            })
                        }
                        className="
                            flex
                            h-9
                            items-center
                            justify-center
                            gap-1.5
                            rounded-lg
                            border
                            border-[var(--color-border)]
                            px-3
                            text-sm
                            font-medium
                            text-[var(--color-text-secondary)]
                            transition-colors
                            hover:bg-[var(--color-background)]
                            hover:text-[var(--color-text)]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <Plus
                            className="size-4"
                            aria-hidden="true"
                        />

                        {
                            locale.createSetup
                                .addTakeProfit
                        }
                    </button>
                </div>

                <div className="space-y-3">
                    {takeProfitFields.map(
                        (field, index) => (
                            <div
                                key={field.id}
                                className="flex items-start gap-2"
                            >
                                <div className="min-w-0 flex-1">
                                    <label
                                        htmlFor={`take-profit-${index}`}
                                        className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                                    >
                                        {
                                            locale
                                                .createSetup
                                                .takeProfitLabel
                                        }{" "}
                                        {index + 1}
                                    </label>

                                    <div className="relative">
                                        <input
                                            id={`take-profit-${index}`}
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0.000000000"
                                            disabled={
                                                isSubmitting
                                            }
                                            {...register(
                                                `takeProfits.${index}.value`,
                                                {
                                                    validate:
                                                        (
                                                            value,
                                                        ) =>
                                                            validatePrice(
                                                                value,
                                                                true,
                                                            ),
                                                },
                                            )}
                                            className="
                                                h-11
                                                w-full
                                                rounded-xl
                                                border
                                                border-[var(--color-border)]
                                                bg-[var(--color-background)]
                                                px-3
                                                pr-10
                                                text-sm
                                                text-[var(--color-text)]
                                                outline-none
                                                transition-colors
                                                placeholder:text-[var(--color-text-muted)]
                                                focus:border-[var(--color-brand)]
                                            "
                                        />

                                        <button
                                            type="button"
                                            aria-label={
                                                locale
                                                    .createSetup
                                                    .clearTakeProfit
                                            }
                                            onClick={() =>
                                                setValue(
                                                    `takeProfits.${index}.value`,
                                                    "",
                                                    {
                                                        shouldValidate:
                                                            true,
                                                    },
                                                )
                                            }
                                            className="
                                                absolute
                                                right-1
                                                top-1/2
                                                flex
                                                size-9
                                                -translate-y-1/2
                                                items-center
                                                justify-center
                                                rounded-lg
                                                text-[var(--color-text-muted)]
                                                hover:bg-[var(--color-surface)]
                                                hover:text-[var(--color-text)]
                                            "
                                        >
                                            <X
                                                className="size-4"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>

                                    {errors.takeProfits?.[
                                        index
                                        ]?.value?.message ? (
                                        <p className="mt-1.5 text-sm text-[var(--color-danger)]">
                                            {
                                                errors
                                                    .takeProfits[
                                                    index
                                                    ]?.value
                                                    ?.message
                                            }
                                        </p>
                                    ) : null}
                                </div>

                                <button
                                    type="button"
                                    aria-label={
                                        locale.createSetup
                                            .deleteTakeProfit
                                    }
                                    disabled={
                                        takeProfitFields.length ===
                                        1 ||
                                        isSubmitting
                                    }
                                    onClick={() =>
                                        removeTakeProfit(
                                            index,
                                        )
                                    }
                                    className="
                                        mt-7
                                        flex
                                        size-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-[var(--color-border)]
                                        text-[var(--color-text-muted)]
                                        transition-colors
                                        hover:border-[var(--color-danger)]
                                        hover:text-[var(--color-danger)]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-40
                                    "
                                >
                                    <Trash2
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        ),
                    )}
                </div>
            </section>

            <section className="grid gap-5">
                <div>
                    <label
                        htmlFor="stop-loss"
                        className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                    >
                        {
                            locale.createSetup
                                .stopLossLabel
                        }
                    </label>

                    <div className="relative">
                        <input
                            id="stop-loss"
                            type="text"
                            inputMode="decimal"
                            placeholder="0.000000000"
                            disabled={isSubmitting}
                            {...register(
                                "stopLoss",
                                {
                                    validate: (
                                        value,
                                    ) =>
                                        validatePrice(
                                            value,
                                            false,
                                        ),
                                },
                            )}
                            className="
                                h-11
                                w-full
                                rounded-xl
                                border
                                border-[var(--color-border)]
                                bg-[var(--color-background)]
                                px-3
                                pr-10
                                text-sm
                                text-[var(--color-text)]
                                outline-none
                                transition-colors
                                placeholder:text-[var(--color-text-muted)]
                                focus:border-[var(--color-brand)]
                            "
                        />

                        <button
                            type="button"
                            aria-label={
                                locale.createSetup
                                    .clearStopLoss
                            }
                            onClick={() =>
                                setValue(
                                    "stopLoss",
                                    "",
                                    {
                                        shouldValidate:
                                            true,
                                    },
                                )
                            }
                            className="
                                absolute
                                right-1
                                top-1/2
                                flex
                                size-9
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-lg
                                text-[var(--color-text-muted)]
                                hover:bg-[var(--color-surface)]
                                hover:text-[var(--color-text)]
                            "
                        >
                            <X
                                className="size-4"
                                aria-hidden="true"
                            />
                        </button>
                    </div>

                    {errors.stopLoss
                        ?.message ? (
                        <p className="mt-1.5 text-sm text-[var(--color-danger)]">
                            {
                                errors.stopLoss
                                    .message
                            }
                        </p>
                    ) : null}
                </div>

                <div>
                    <label
                        htmlFor="setup-note"
                        className="mb-2 block text-sm font-medium text-[var(--color-text)]"
                    >
                        {
                            locale.createSetup
                                .noteLabel
                        }
                    </label>

                    <textarea
                        id="setup-note"
                        rows={4}
                        maxLength={1000}
                        disabled={isSubmitting}
                        placeholder={
                            locale.createSetup
                                .notePlaceholder
                        }
                        {...register("note", {
                            maxLength: {
                                value: 1000,
                                message:
                                locale
                                    .createSetup
                                    .noteMaxLength,
                            },
                        })}
                        className="
                            w-full
                            resize-y
                            rounded-xl
                            border
                            border-[var(--color-border)]
                            bg-[var(--color-background)]
                            px-3
                            py-3
                            text-sm
                            text-[var(--color-text)]
                            outline-none
                            transition-colors
                            placeholder:text-[var(--color-text-muted)]
                            focus:border-[var(--color-brand)]
                        "
                    />

                    {errors.note?.message ? (
                        <p className="mt-1.5 text-sm text-[var(--color-danger)]">
                            {errors.note.message}
                        </p>
                    ) : null}
                </div>
            </section>

            {submitError ? (
                <div
                    role="alert"
                    className="
                        rounded-xl
                        border
                        border-[var(--color-danger)]
                        px-4
                        py-3
                        text-sm
                        text-[var(--color-danger)]
                    "
                >
                    {submitError}
                </div>
            ) : null}

            <footer
                className="
                    flex
                    flex-col-reverse
                    gap-3
                    border-t
                    border-[var(--color-border)]
                    pt-5
                    sm:flex-row
                    sm:justify-end
                "
            >
                <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={onCancelAction}
                    className="
                        h-11
                        rounded-xl
                        border
                        border-[var(--color-border)]
                        px-5
                        text-sm
                        font-medium
                        text-[var(--color-text-secondary)]
                        transition-colors
                        hover:bg-[var(--color-background)]
                        hover:text-[var(--color-text)]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {locale.createSetup.cancel}
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                        flex
                        h-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-[var(--color-brand)]
                        px-5
                        text-sm
                        font-medium
                        text-white
                        transition-colors
                        hover:bg-[var(--color-brand-hover)]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    {isSubmitting
                        ? locale.createSetup
                            .submitting
                        : locale.createSetup
                            .submit}
                </button>
            </footer>
        </form>
    );
};

export {CreateSetupForm};