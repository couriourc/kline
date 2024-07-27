import {requester} from "~/services";

export const postStockMarketKline = () =>
    requester.post("/stock/market/kline", {});
