import { getCcyKey } from "./getCcyKey.js";

export function createTradeConfirmMessage(state) {
  return `${state.buySell === "BUY" ? "Bought" : "Sold"} ${
    state.amount
  } ${state.investmentCcy.toUpperCase()} for ${
    getCounterRate(state) * Number(state.amount)
  } ${getCounterCcy(state).toUpperCase()}`;
}

function getBidAsk(state) {
  const ccyKey = getCcyKey(state.ccyPair);
  return state.price[ccyKey];
}

function getCounterCcy(state) {
  return state.investmentCcy === state.ccyPair.ccy1
    ? state.ccyPair.ccy2
    : state.ccyPair.ccy1;
}

function getCounterRate(state) {
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
