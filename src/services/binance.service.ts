import type {
    BinanceExchangeInfoResponse,
    BinanceFuturesFilter,
    BinanceFuturesSymbol,
    BinanceFuturesSymbolRaw,
} from "@/src/types";

const BINANCE_FUTURES_EXCHANGE_INFO_URL =
    "https://fapi.binance.com/fapi/v1/exchangeInfo";

const BINANCE_SYMBOLS_REVALIDATE_SECONDS =
    60 * 60;

type BinancePriceFilter =
    BinanceFuturesFilter & {
    minPrice: string;
    maxPrice: string;
    tickSize: string;
};

const isBinancePriceFilter = (
    filter: BinanceFuturesFilter,
): filter is BinancePriceFilter => {
    return (
        filter.filterType ===
        "PRICE_FILTER" &&
        typeof filter.minPrice === "string" &&
        typeof filter.maxPrice === "string" &&
        typeof filter.tickSize === "string"
    );
};

const getPriceFilter = (
    symbol: BinanceFuturesSymbolRaw,
): BinancePriceFilter => {
    const priceFilter =
        symbol.filters.find(
            isBinancePriceFilter,
        );

    if (!priceFilter) {
        throw new Error(
            `PRICE_FILTER is missing for Binance symbol ${symbol.symbol}`,
        );
    }

    return priceFilter;
};

const normalizeBinanceSymbol = (
    symbol: BinanceFuturesSymbolRaw,
): BinanceFuturesSymbol => {
    const priceFilter =
        getPriceFilter(symbol);

    return {
        symbol: symbol.symbol,
        baseAsset: symbol.baseAsset,
        quoteAsset: symbol.quoteAsset,
        pricePrecision:
        symbol.pricePrecision,
        minPrice:
        priceFilter.minPrice,
        maxPrice:
        priceFilter.maxPrice,
        tickSize:
        priceFilter.tickSize,
    };
};

const isSupportedFuturesSymbol = (
    symbol: BinanceFuturesSymbolRaw,
): boolean => {
    return (
        symbol.status === "TRADING" &&
        symbol.contractType ===
        "PERPETUAL" &&
        symbol.quoteAsset === "USDT"
    );
};

export const getBinanceFuturesSymbols =
    async (): Promise<
        BinanceFuturesSymbol[]
    > => {
        const response = await fetch(
            BINANCE_FUTURES_EXCHANGE_INFO_URL,
            {
                next: {
                    revalidate:
                    BINANCE_SYMBOLS_REVALIDATE_SECONDS,
                },
            },
        );

        if (!response.ok) {
            throw new Error(
                `Binance exchange info request failed with status ${response.status}`,
            );
        }

        const data =
            (await response.json()) as BinanceExchangeInfoResponse;

        if (!Array.isArray(data.symbols)) {
            throw new Error(
                "Binance exchange info response does not contain symbols",
            );
        }

        return data.symbols
            .filter(
                isSupportedFuturesSymbol,
            )
            .map(
                normalizeBinanceSymbol,
            )
            .sort(
                (
                    firstSymbol,
                    secondSymbol,
                ) =>
                    firstSymbol.symbol.localeCompare(
                        secondSymbol.symbol,
                    ),
            );
    };

export const getBinanceFuturesSymbol =
    async (
        symbol: string,
    ): Promise<
        BinanceFuturesSymbol | null
    > => {
        const normalizedSymbol =
            symbol
                .trim()
                .toUpperCase();

        const symbols =
            await getBinanceFuturesSymbols();

        return (
            symbols.find(
                (binanceSymbol) =>
                    binanceSymbol.symbol ===
                    normalizedSymbol,
            ) ?? null
        );
    };