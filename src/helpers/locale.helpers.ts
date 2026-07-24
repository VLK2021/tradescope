export type AppLanguage = "uk" | "en";

export const DEFAULT_LANGUAGE: AppLanguage = "uk";

export const SUPPORTED_LANGUAGES: AppLanguage[] = ["uk", "en"];

export const getValidLanguage = (lang?: string): AppLanguage => {
    return SUPPORTED_LANGUAGES.includes(lang as AppLanguage)
        ? (lang as AppLanguage)
        : DEFAULT_LANGUAGE;
};