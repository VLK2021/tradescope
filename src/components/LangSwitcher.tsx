"use client";

import { useLanguage } from "@/src/context";


const LangSwitcher =() => {
    const { lang, setLang } = useLanguage();

    return (
        <div
            className="
                relative
                inline-flex
                h-8
                sm:h-9
                md:h-10
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
            "
        >
            <select
                value={lang}
                onChange={(e) => setLang(e.target.value as "uk" | "en")}
                aria-label="Select language"
                className="
                    h-full
                    cursor-pointer
                    appearance-none
                    bg-transparent
                    pr-5
                    text-xs
                    sm:text-sm
                    font-medium
                    text-[var(--color-text)]
                    outline-none
                "
            >
                <option value="uk">🇺🇦 UA</option>
                <option value="en">🇬🇧 EN</option>
            </select>

            <span
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
}

export {LangSwitcher}