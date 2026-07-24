"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import {useRouter} from "next/navigation";

import en from "@/src/locales/en";
import uk from "@/src/locales/uk";
import type {AppLanguage} from "@/src/helpers";

type Dictionary = typeof en;

type LanguageContextType = {
    lang: AppLanguage;
    setLang: (lang: AppLanguage) => void;
    locale: Dictionary;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
    children: ReactNode;
    initialLang: AppLanguage;
};

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
        setLangState(nextLang);

        localStorage.setItem("lang", nextLang);
        document.cookie = `lang=${nextLang}; path=/; max-age=31536000; SameSite=Lax`;

        router.refresh();
    };

    useEffect(() => {
        localStorage.setItem("lang", lang);
        document.cookie = `lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    }, [lang]);

    return (
        <LanguageContext.Provider
            value={{
                lang,
                setLang,
                locale,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }

    return context;
};