type PriceLevelType =
    | "entry"
    | "takeProfit"
    | "stopLoss";

type PriceDistanceResult = {
    percent: number;
    absolutePercent: number;
    priceDifference: number;
};

type CalculatePriceDistanceParams = {
    currentPrice: number | null;
    levelPrice: string | number;
    levelType: PriceLevelType;
};

const getPercentSign = (
    levelType: PriceLevelType,
): 1 | -1 => {
    if (levelType === "takeProfit") {
        return 1;
    }

    return -1;
};

const calculatePriceDistance = ({
                                    currentPrice,
                                    levelPrice,
                                    levelType,
                                }: CalculatePriceDistanceParams): PriceDistanceResult | null => {
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

    const priceDifference =
        Math.abs(
            numericLevelPrice -
            currentPrice,
        );

    const absolutePercent =
        (priceDifference /
            currentPrice) *
        100;

    const percent =
        absolutePercent *
        getPercentSign(levelType);

    return {
        percent,
        absolutePercent,
        priceDifference,
    };
};

export {
    calculatePriceDistance,
};

export type {
    CalculatePriceDistanceParams,
    PriceDistanceResult,
    PriceLevelType,
};