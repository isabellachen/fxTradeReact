import { FxSpotActions, FxSpotState } from "./interfaces";

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
