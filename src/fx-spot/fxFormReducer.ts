export enum BuySell {
  Buy = "BUY",
  Sell = "SELL",
}

export interface CcyPair {
  ccy1: string;
  ccy2: string;
}

export type FxFormActions =
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

export interface FxFormState {
  buySell: BuySell;
  investmentCcy: string;
  amount: string;
  ccyPair: CcyPair;
}

export const initialFxFormState = {
  buySell: BuySell.Buy,
  investmentCcy: "EUR",
  amount: "",
  ccyPair: { ccy1: "EUR", ccy2: "USD" },
};

export function fxFormReducer(state: FxFormState, action: FxFormActions) {
  switch (action.type) {
    case "SET_BUY_OR_SELL":
      return { ...state, buySell: action.payload };
    case "SET_INVESTMENT_CCY":
      return { ...state, investmentCcy: action.payload };
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_CCY_PAIR":
      const pairValues = Object.values(action.payload);
      const isSelectedInvestmentCcyInNewPair = pairValues.includes(
        state.investmentCcy
      );
      const defaultInvestmentCcy = isSelectedInvestmentCcyInNewPair
        ? state.investmentCcy
        : pairValues[0];
      return {
        ...state,
        ccyPair: action.payload,
        investmentCcy: defaultInvestmentCcy,
      };
    default:
      return state;
  }
}
