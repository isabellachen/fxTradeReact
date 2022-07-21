import { FxPriceByCcyPair } from "../CustomHooks/useGetFxPrices";

export enum BuySell {
  Buy = "BUY",
  Sell = "SELL",
}

export interface FxSpotState {
  buySell: BuySell;
  investmentCcy: string;
  amount: string;
  prices: FxPriceByCcyPair | undefined;
  ccyPair: string;
}

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
      payload: string;
    };

export function fxSpotReducer(state: FxSpotState, action: FxSpotActions) {
  switch (action.type) {
    case "GET_PRICES_SUCCESS":
      return { ...state, prices: action.payload };
    case "SET_BUY_OR_SELL":
      return { ...state, buySell: action.payload };
    case "SET_INVESTMENT_CCY":
      return { ...state, investmentCcy: action.payload };
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_CCY_PAIR":
      const ccyLabel = Object.values(
        (state.prices as FxPriceByCcyPair)[action.payload].ccyPair
      );
      const prefillSelectedCcy = ccyLabel.includes(state.investmentCcy)
        ? state.investmentCcy
        : ccyLabel[0];
      console.log(ccyLabel);
      return {
        ...state,
        ccyPair: action.payload,
        investmentCcy: prefillSelectedCcy,
      };
    default:
      return state;
  }
}
