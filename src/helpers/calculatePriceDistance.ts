type PriceDistanceResult = {
    signedPercent: number;
    absolutePercent: number;
};

const calculatePriceDistance = (
    currentPrice: number | null,
    levelPrice: string | number,
): PriceDistanceResult | null => {
    const numericLevelPrice =
        Number(levelPrice);

    if (
        currentPrice === null ||
        !Number.isFinite(currentPrice) ||
        currentPrice <= 0 ||
        !Number.isFinite(numericLevelPrice) ||
        numericLevelPrice <= 0
    ) {
        return null;
    }

    const signedPercent =
        ((numericLevelPrice -
                currentPrice) /
            currentPrice) *
        100;

    return {
        signedPercent,
        absolutePercent:
            Math.abs(signedPercent),
    };
};

export {calculatePriceDistance};

export type {PriceDistanceResult};