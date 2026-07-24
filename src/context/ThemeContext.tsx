"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useSyncExternalStore,
    type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_EVENT = "theme-change";

const isTheme = (value: string | null): value is Theme => {
    return value === "light" || value === "dark";
};

const getTheme = (): Theme => {
    if (typeof window === "undefined") return "dark";

    const saved = localStorage.getItem("theme");

    if (isTheme(saved)) {
        return saved;
    }

    return "dark";
};

const getServerTheme = (): Theme => {
    return "dark";
};


const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") {
        return () => {};
    }

    window.addEventListener("storage", callback);
    window.addEventListener(THEME_EVENT, callback);

    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(THEME_EVENT, callback);
    };
};

const applyTheme = (theme: Theme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        applyTheme(theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        const nextTheme: Theme = getTheme() === "light" ? "dark" : "light";

        localStorage.setItem("theme", nextTheme);
        applyTheme(nextTheme);

        window.dispatchEvent(new Event(THEME_EVENT));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);

    if (!ctx) {
        throw new Error("useTheme must be used within ThemeProvider");
    }

    return ctx;
};