"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/src/context";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="
                group inline-flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10
                items-center justify-center rounded-full
                border border-[var(--color-border)]
                bg-[var(--color-card)]
                text-[var(--color-text)]
                shadow-sm transition-all duration-300
                hover:border-[var(--color-brand)]
                hover:bg-[var(--color-brand)]
                hover:text-white
                hover:shadow-md active:scale-95 cursor-pointer
            "
        >
            <span className="transition-transform duration-300 group-hover:rotate-12">
                {theme === "light" ? (
                    <Moon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                ) : (
                    <Sun className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                )}
            </span>
        </button>
    );
};

export { ThemeSwitcher };