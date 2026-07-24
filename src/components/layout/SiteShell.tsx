import type {ReactNode} from "react";


type SiteShellProps = {
    children: ReactNode;
};

export const SiteShell = ({children}: SiteShellProps) => {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <main className="relative z-10 flex-1 pt-20">
                {children}
            </main>

        </div>
    );
};