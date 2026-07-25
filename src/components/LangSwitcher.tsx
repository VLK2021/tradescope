"use client";

import {useLanguage} from "@/src/context";
import type {AppLanguage} from "@/src/helpers";

const LangSwitcher = () => {
    const {lang, setLang} = useLanguage();

    const handleLanguageChange = (
        language: string,
    ) => {
        setLang(language as AppLanguage);
    };

    return (
        <div
            className="
                relative
                inline-flex
                h-8
                items-center
                rounded-full
                border
                border-[var(--color-border)]
                bg-[var(--color-card)]
                px-2
                shadow-sm
                transition-all
                duration-300
                hover:border-[var(--color-brand)]
                hover:shadow-md
                sm:h-9
                md:h-10
            "
        >
            <select
                value={lang}
                onChange={(event) => {
                    handleLanguageChange(event.target.value);
                }}
                aria-label="Вибрати мову"
                className="
                    h-full
                    cursor-pointer
                    appearance-none
                    bg-transparent
                    pr-5
                    text-xs
                    font-medium
                    text-[var(--color-text)]
                    outline-none
                    sm:text-sm
                "
            >
                <option value="uk">🇺🇦 UA</option>
                <option value="en">🇬🇧 EN</option>
            </select>

            <span
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    right-2
                    top-1/2
                    -translate-y-1/2
                    text-[10px]
                    text-[var(--color-text-muted)]
                "
            >
                ▼
            </span>
        </div>
    );
};

export {LangSwitcher};