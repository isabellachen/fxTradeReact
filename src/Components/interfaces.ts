import { FxPriceByCcyPair } from "../CustomHooks/useGetFxPrices";
export type FxSpotActions =
  | {
      type: "GET_PRICES_SUCCESS";
      payload: FxPriceByCcyPair;
    }
  | {
      type: "SET_BUY_OR_SELL";
      payload: BuySell;
    }
  | {
      type: "SET_INVESTMENT_CCY";
      payload: string;
    }
  | {
      type: "SET_AMOUNT";
      payload: string;
    }
  | {
      type: "SET_CCY_PAIR";
      payload: CcyPair;
    };

export interface FxSpotState {
  buySell: BuySell;
  investmentCcy: string;
  amount: string;
  prices: FxPriceByCcyPair | undefined;
  ccyPair: CcyPair;
}
export interface OnFxRatesReceived {
  onReceive: (prices: FxPriceByCcyPair) => void;
}
export interface FxComponentProps {
  fxState: FxSpotState;
  onGetPrices: (action: FxSpotActions) => void;
}
export enum BuySell {
  Buy = "BUY",
  Sell = "SELL",
}

export interface CcyPair {
  ccy1: string;
  ccy2: string;
}
