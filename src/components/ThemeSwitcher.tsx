"use client";

import {Moon, Sun} from "lucide-react";

import {useLanguage, useTheme} from "@/src/context";

const ThemeSwitcher = () => {
    const {theme, toggleTheme} = useTheme();
    const {locale} = useLanguage();

    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                isDark
                    ? locale.header.enableLightTheme
                    : locale.header.enableDarkTheme
            }
            title={
                isDark
                    ? locale.header.enableLightTheme
                    : locale.header.enableDarkTheme
            }
            className="
                flex
                size-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-[var(--color-border)]
                bg-[var(--color-card)]
                text-[var(--color-text-secondary)]
                transition-all
                duration-200
                hover:border-[var(--color-brand)]
                hover:text-[var(--color-brand)]
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--color-brand)]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--color-background)]
            "
        >
            {isDark ? (
                <Sun
                    className="size-5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                />
            ) : (
                <Moon
                    className="size-5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                />
            )}
        </button>
    );
};

export {ThemeSwitcher};