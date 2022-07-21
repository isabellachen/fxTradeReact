import React, { useReducer, useState } from "react";
import { useGetFxPrices } from "../CustomHooks/useGetFxPrices";
import { fxSpotReducer, BuySell } from "./fxSpotReducer";
import { createTradeConfirmMessage } from "../modules/createTradeConfirmationMessage";
import { getCcyKey } from "../modules/getCcyKey";
import { CurrencyPairSelector } from "./CurrencyPairSelector";
import { PriceDisplay } from "./PriceDisplay";
import { FxTradeForm } from "./FxTradeForm";
const initialFxState = {
  buySell: BuySell.Buy,
  investmentCcy: "EUR",
  amount: "",
  prices: undefined,
  ccyPair: { ccy1: "EUR", ccy2: "USD" },
};

export function FxSpot(): JSX.Element {
  const [fxState, fxDispatch] = useReducer(fxSpotReducer, initialFxState);
  const [tradeConfirmationMessage, setTradeConfirmationMessage] = useState<
    string | undefined
  >();

  useGetFxPrices(fxDispatch);

  return (
    <div>
      {fxState.prices === undefined ? (
        <div>loading...</div>
      ) : (
        <div>
          <CurrencyPairSelector fxState={fxState} fxDispatch={fxDispatch} />
          <PriceDisplay fxState={fxState} />
          <FxTradeForm fxState={fxState} fxDispatch={fxDispatch} />
          <button
            onClick={() => {
              console.log(fxState);
              const tradeConfirmationMessage =
                createTradeConfirmMessage(fxState);
              setTradeConfirmationMessage(tradeConfirmationMessage);
            }}
            disabled={fxState.amount.length < 1}
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
