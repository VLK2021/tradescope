"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type {AppTheme} from "@/src/helpers";

type ThemeContextValue = {
    theme: AppTheme;
    toggleTheme: () => void;
};

type ThemeProviderProps = {
    children: ReactNode;
    initialTheme: AppTheme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const applyTheme = (theme: AppTheme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
};

export const ThemeProvider = ({
                                  children,
                                  initialTheme,
                              }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<AppTheme>(initialTheme);

    const toggleTheme = useCallback(() => {
        setTheme((currentTheme) => {
            const nextTheme: AppTheme =
                currentTheme === "dark" ? "light" : "dark";

            applyTheme(nextTheme);

            document.cookie = [
                `theme=${nextTheme}`,
                "Path=/",
                `Max-Age=${THEME_COOKIE_MAX_AGE}`,
                "SameSite=Lax",
            ].join("; ");

            return nextTheme;
        });
    }, []);

    const value = useMemo<ThemeContextValue>(() => {
        return {
            theme,
            toggleTheme,
        };
    }, [theme, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme must be used within ThemeProvider",
        );
    }

    return context;
};