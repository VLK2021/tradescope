"use client";

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import {useRouter} from "next/navigation";

import en from "@/src/locales/en";
import uk from "@/src/locales/uk";
import type {AppLanguage} from "@/src/helpers";

type Dictionary = typeof uk;

type LanguageContextValue = {
    lang: AppLanguage;
    locale: Dictionary;
    setLang: (language: AppLanguage) => void;
};

type LanguageProviderProps = {
    children: ReactNode;
    initialLang: AppLanguage;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const LanguageProvider = ({
                                     children,
                                     initialLang,
                                 }: LanguageProviderProps) => {
    const router = useRouter();

    const [lang, setLangState] = useState<AppLanguage>(initialLang);

    const locale = useMemo(() => {
        return lang === "en" ? en : uk;
    }, [lang]);

    const setLang = (nextLang: AppLanguage) => {
        if (nextLang === lang) {
            return;
        }

        setLangState(nextLang);

        document.cookie = [
            `lang=${nextLang}`,
            "Path=/",
            `Max-Age=${LANGUAGE_COOKIE_MAX_AGE}`,
            "SameSite=Lax",
        ].join("; ");

        router.refresh();
    };

    const value = useMemo<LanguageContextValue>(() => {
        return {
            lang,
            locale,
            setLang,
        };
    }, [lang, locale]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextValue => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used within LanguageProvider",
        );
    }

    return context;
};