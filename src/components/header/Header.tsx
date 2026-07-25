import {AddSetupButton} from "./AddSetupButton";
import {HeaderBrand} from "./HeaderBrand";
import {HeaderControls} from "./HeaderControls";

const Header = () => {
    return (
        <header
            className="
                sticky
                top-0
                z-50
                w-full
                border-b
                border-[var(--color-border)]
                bg-[var(--color-background)]
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    w-full
                    max-w-[1600px]
                    flex-wrap
                    items-center
                    gap-x-4
                    gap-y-3
                    px-4
                    py-3
                    sm:px-5
                    md:flex-nowrap
                    md:px-6
                    md:py-3.5
                    lg:px-8
                "
            >
                <div className="flex min-w-0 flex-1 items-center">
                    <HeaderBrand />
                </div>

                <div
                    className="
                        order-3
                        flex
                        w-full
                        basis-full
                        justify-center
                        md:order-none
                        md:w-auto
                        md:basis-auto
                        md:flex-1
                    "
                >
                    <AddSetupButton />
                </div>

                <div className="flex flex-1 justify-end">
                    <HeaderControls />
                </div>
            </div>
        </header>
    );
};

export {Header};