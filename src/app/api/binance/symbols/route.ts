import {
    createSuccessResponse,
    handleApiError,
} from "@/src/helpers";
import { getBinanceFuturesSymbols } from "@/src/services/binance.service";

export const GET = async () => {
    try {
        const symbols = await getBinanceFuturesSymbols();

        return createSuccessResponse(symbols);
    } catch (error) {
        return handleApiError(
            error,
            "Не вдалося отримати список Binance Futures інструментів",
        );
    }
};