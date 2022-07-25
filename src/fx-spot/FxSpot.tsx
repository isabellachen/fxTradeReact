import React, { ChangeEvent, useCallback, useReducer, useState } from "react";
import { FxPriceByCcyPair, useGetFxPrices } from "./useGetFxPrices";
import {
  BuySell,
  fxFormReducer,
  FxFormState,
  initialFxFormState,
} from "./fxFormReducer";
import { CurrencyPairSelector } from "./CurrencyPairSelector";
import { PriceDisplay } from "./PriceDisplay";
import { FxTradeForm } from "./FxTradeForm";
import { getCcyKey } from "./getCcyKey";

type ConfirmMessageState = FxFormState & { prices: FxPriceByCcyPair };

export function FxSpot(): JSX.Element {
  const [fxFormState, fxFormDispatch] = useReducer(
    fxFormReducer,
    initialFxFormState
  );
  const [prices, setPrices] = useState<FxPriceByCcyPair | undefined>();
  const [tradeConfirmationMessage, setTradeConfirmationMessage] = useState<
    string | undefined
  >();

  const onReceivePrices = useCallback(
    (prices: FxPriceByCcyPair) => setPrices(prices),
    [setPrices]
  );

  useGetFxPrices(onReceivePrices);

  function handleSubmit() {
    if (!prices) {
      return;
    }
    const tradeConfirmationMessage = createTradeConfirmMessage({
      ...fxFormState,
      prices,
    });
    setTradeConfirmationMessage(tradeConfirmationMessage);
  }

  function handleCurrencyChange(ccy: string) {
    fxFormDispatch({
      type: "SET_INVESTMENT_CCY",
      payload: ccy,
    });
  }

  function handleBuySellChange(event: ChangeEvent<HTMLInputElement>) {
    fxFormDispatch({
      type: "SET_BUY_OR_SELL",
      payload: event.target.value as BuySell,
    });
  }

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    fxFormDispatch({
      type: "SET_AMOUNT",
      payload: event.target.value,
    });
  }

  return (
    <div>
      {prices === undefined ? (
        <div>loading...</div>
      ) : (
        <div>
          <CurrencyPairSelector
            prices={prices}
            ccyPair={fxFormState.ccyPair}
            handleChange={(event: ChangeEvent<HTMLSelectElement>) => {
              const pairString = event.target.value;
              const ccyPair = prices[pairString].ccyPair;
              fxFormDispatch({ type: "SET_CCY_PAIR", payload: ccyPair });
            }}
          />
          <PriceDisplay prices={prices} selectedCcyPair={fxFormState.ccyPair} />
          <FxTradeForm
            fxFormState={fxFormState}
            handleBuySellChange={handleBuySellChange}
            handleCurrencyChange={handleCurrencyChange}
            handleAmountChange={handleAmountChange}
            prices={prices}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={fxFormState.amount.length < 1}
          >
            TRADE
          </button>
          {tradeConfirmationMessage && (
            <div className="successMessage">{tradeConfirmationMessage}</div>
          )}
        </div>
      )}
    </div>
  );
}

export function createTradeConfirmMessage(
  state: FxFormState & { prices: FxPriceByCcyPair }
) {
  // return `${action} ${amount} ${ccy} for ${price} ${counterCcy}`
  return `${state.buySell === "BUY" ? "Bought" : "Sold"} ${
    state.amount
  } ${state.investmentCcy.toUpperCase()} for ${
    getCounterRate(state) * Number(state.amount)
  } ${getCounterCcy(state).toUpperCase()}`;
}

function getBidAsk(state: ConfirmMessageState) {
  const ccyKey = getCcyKey(state.ccyPair);
  return (state.prices as FxPriceByCcyPair)[ccyKey];
}

function getCounterCcy(state: ConfirmMessageState) {
  return state.investmentCcy === state.ccyPair.ccy1
    ? state.ccyPair.ccy2
    : state.ccyPair.ccy1;
}

function getCounterRate(state: ConfirmMessageState) {
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
