"use client";

import {ChevronDown, Globe2} from "lucide-react";

import {useLanguage} from "@/src/context";
import type {AppLanguage} from "@/src/helpers";

const LangSwitcher = () => {
    const {lang, locale, setLang} = useLanguage();

    const handleChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setLang(event.target.value as AppLanguage);
    };

    return (
        <div
            className="
                relative
                flex
                h-10
                shrink-0
                items-center
                gap-2
                rounded-lg
                border
                border-[var(--color-border)]
                bg-[var(--color-card)]
                px-3
                text-[var(--color-text)]
                transition-colors
                duration-200
                hover:border-[var(--color-brand)]
            "
        >
            <Globe2
                className="size-[18px] shrink-0"
                strokeWidth={1.8}
                aria-hidden="true"
            />

            <select
                value={lang}
                onChange={handleChange}
                aria-label={locale.header.selectLanguage}
                className="
                    h-full
                    cursor-pointer
                    appearance-none
                    border-0
                    bg-transparent
                    pr-5
                    text-sm
                    font-medium
                    text-[var(--color-text)]
                    outline-none
                "
            >
                <option value="uk">UA</option>
                <option value="en">EN</option>
            </select>

            <ChevronDown
                className="
                    pointer-events-none
                    absolute
                    right-2.5
                    size-4
                    text-[var(--color-text-muted)]
                "
                strokeWidth={1.8}
                aria-hidden="true"
            />
        </div>
    );
};

export {LangSwitcher};