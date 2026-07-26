import {
    HomePage,
    type HomePageSearchParams,
} from "@/src/components/home";

type HomeProps = {
    searchParams: Promise<HomePageSearchParams>;
};

export default async function Home({
                                       searchParams,
                                   }: HomeProps) {
    const resolvedSearchParams =
        await searchParams;

    return (
        <HomePage
            searchParams={
                resolvedSearchParams
            }
        />
    );
}