import type {ReactNode} from "react";

import {Header} from "@/src/components/header";

type SiteShellProps = {
    children: ReactNode;
};

const SiteShell = ({
                       children,
                   }: SiteShellProps) => {
    return (
        <div
            className="
                flex
                min-h-screen
                flex-col
                overflow-x-hidden
                bg-[var(--color-background)]
                text-[var(--color-text)]
            "
        >
            <Header />

            <main className="flex-1">
                {children}
            </main>
        </div>
    );
};

export {SiteShell};