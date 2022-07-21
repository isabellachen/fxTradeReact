import { FxSpotState } from "../Components/interfaces";
import { FxPriceByCcyPair } from "../CustomHooks/useGetFxPrices";
import { getCcyKey } from "./getCcyKey";

export function createTradeConfirmMessage(state: FxSpotState) {
  return `${state.buySell === "BUY" ? "Bought" : "Sold"} ${
    state.amount
  } ${state.investmentCcy.toUpperCase()} for ${
    getCounterRate(state) * Number(state.amount)
  } ${getCounterCcy(state).toUpperCase()}`;
}

function getBidAsk(state: FxSpotState) {
  const ccyKey = getCcyKey(state.ccyPair);
  return (state.prices as FxPriceByCcyPair)[ccyKey];
}

function getCounterCcy(state: FxSpotState) {
  return state.investmentCcy === state.ccyPair.ccy1
    ? state.ccyPair.ccy2
    : state.ccyPair.ccy1;
}

function getCounterRate(state: FxSpotState) {
  if (state.buySell === "BUY") {
    if (state.investmentCcy === state.ccyPair.ccy1) {
      return Number(getBidAsk(state).bid);
    } else {
      return 1 / Number(getBidAsk(state).bid);
    }
  } else {
    if (state.investmentCcy === state.ccyPair.ccy1) {
      return Number(getBidAsk(state).ask);
    } else {
      return 1 / Number(getBidAsk(state).ask);
    }
  }
}
