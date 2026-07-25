export type AppTheme = "light" | "dark";

export const DEFAULT_THEME: AppTheme = "dark";

export const SUPPORTED_THEMES: readonly AppTheme[] = ["light", "dark"];

export const getValidTheme = (
    theme?: string,
): AppTheme => {
    return SUPPORTED_THEMES.includes(theme as AppTheme)
        ? (theme as AppTheme)
        : DEFAULT_THEME;
};