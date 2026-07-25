export type AppLanguage = "uk" | "en";

export const DEFAULT_LANGUAGE: AppLanguage = "uk";

export const SUPPORTED_LANGUAGES: readonly AppLanguage[] = ["uk", "en"];

export const getValidLanguage = (
    language?: string,
): AppLanguage => {
    return SUPPORTED_LANGUAGES.includes(language as AppLanguage)
        ? (language as AppLanguage)
        : DEFAULT_LANGUAGE;
};