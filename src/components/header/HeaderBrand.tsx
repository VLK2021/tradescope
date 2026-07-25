import {Orbit} from "lucide-react";

import {HEADER} from "@/src/constants";

const HeaderBrand = () => {
    return (
        <div className="flex min-w-0 items-center gap-2.5">
            <div
                className="
                    flex
                    size-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[var(--color-brand)]
                    text-white
                    sm:size-10
                "
                aria-hidden="true"
            >
                <Orbit
                    className="size-5 sm:size-6"
                    strokeWidth={2.2}
                />
            </div>

            <span
                className="
                    truncate
                    text-lg
                    font-semibold
                    tracking-[-0.02em]
                    text-[var(--color-text)]
                    sm:text-xl
                    lg:text-2xl
                "
            >
                {HEADER.appName}
            </span>
        </div>
    );
};

export {HeaderBrand};