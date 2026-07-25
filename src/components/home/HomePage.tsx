import {
    setupQuerySchema,
} from "@/src/schemas/setup.schema";
import {
    getSetups,
} from "@/src/services/setup.service";
import {
    SetupsList,
} from "@/src/components/setups";
import type {
    SetupItem,
} from "@/src/types/setup";

const HomePage = async () => {
    const query =
        setupQuerySchema.parse({});

    const result =
        await getSetups(query);

    const setups =
        result.data as SetupItem[];

    return (
        <main
            className="
                mx-auto
                w-full
                max-w-[1600px]
                px-4
                py-8
                sm:px-5
                md:px-6
                lg:px-8
            "
        >
            <div className="mb-6">
                <h1
                    className="
                        text-2xl
                        font-semibold
                        text-[var(--color-text)]
                    "
                >
                    TradeScope
                </h1>

                <p
                    className="
                        mt-1
                        text-sm
                        text-[var(--color-text-secondary)]
                    "
                >
                    Торгові сетапи та рівні
                    управління позиціями
                </p>
            </div>

            <SetupsList setups={setups} />
        </main>
    );
};

export {HomePage};