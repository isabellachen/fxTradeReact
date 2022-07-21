import React, { useReducer, useState } from "react";
import { useGetFxPrices } from "../CustomHooks/useGetFxPrices";
import { fxSpotReducer } from "./fxSpotReducer";
import { createTradeConfirmMessage } from "../modules/createTradeConfirmationMessage";
import { CurrencyPairSelector } from "./CurrencyPairSelector";
import { PriceDisplay } from "./PriceDisplay";
import { FxTradeForm } from "./FxTradeForm";
import { BuySell } from "./interfaces";

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
            type="submit"
            onClick={() => {
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
