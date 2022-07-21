import React, { useEffect, useReducer, useState } from "react";
import {
  FxPriceByCcyPair,
  useGetFxPrices,
} from "../CustomHooks/useGetFxPrices";
import { CircularProgress, Paper } from "@mui/material";
import { fxSpotReducer, BuySell } from "./fxSpotReducer";
import { createTradeConfirmMessage } from "../modules/createTradeConfirmationMessage";

const initialFxState = {
  buySell: BuySell.Buy,
  investmentCcy: "EUR",
  amount: "",
  prices: undefined,
  ccyPair: "eurusd",
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
        <CircularProgress />
      ) : (
        <div>
          <select
            value={fxState.ccyPair}
            data-testid="currency-pair-select"
            onChange={(event) => {
              fxDispatch({ type: "SET_CCY_PAIR", payload: event.target.value });
            }}
          >
            {fxState.prices &&
              Object.keys(fxState.prices).map((ccyPair) => {
                return (
                  <option value={ccyPair} key={ccyPair}>
                    {(fxState.prices as FxPriceByCcyPair)[ccyPair].ccyPair.ccy1}{" "}
                    /{" "}
                    {(fxState.prices as FxPriceByCcyPair)[ccyPair].ccyPair.ccy2}
                  </option>
                );
              })}
          </select>
          <div>
            <Paper>
              <div>Bid</div>
              {fxState.prices && (
                <div title="Bid">{fxState.prices[fxState.ccyPair].bid}</div>
              )}
            </Paper>
            <Paper>
              <div>Ask</div>
              {fxState.prices && (
                <div title="Ask">{fxState.prices[fxState.ccyPair].ask}</div>
              )}
            </Paper>
          </div>
          <form>
            <div>
              <input
                type="radio"
                id="buy-radio"
                name="buy"
                value={BuySell.Buy}
                checked={fxState.buySell === BuySell.Buy}
                onChange={(event) => {
                  fxDispatch({ type: "SET_BUY_OR_SELL", payload: BuySell.Buy });
                  console.log(event.target.value);
                }}
              />
              <label htmlFor="buy-radio">Buy</label>
              <input
                type="radio"
                id="sell-radio"
                name="sell"
                value={BuySell.Sell}
                checked={fxState.buySell === BuySell.Sell}
                onChange={(event) => {
                  fxDispatch({
                    type: "SET_BUY_OR_SELL",
                    payload: BuySell.Sell,
                  });
                  console.log(event.target.value);
                }}
              />
              <label htmlFor="sell-radio">Sell</label>
            </div>

            <div style={{ display: "flex" }}>
              {Object.values(fxState.prices[fxState.ccyPair].ccyPair).map(
                (ccy, index) => {
                  return (
                    <div>
                      <input
                        type="radio"
                        id={`${ccy}-currency-radio`}
                        name={`${ccy}-currency`}
                        value={ccy}
                        checked={fxState.investmentCcy === ccy}
                        onChange={(event) => {
                          fxDispatch({
                            type: "SET_INVESTMENT_CCY",
                            payload: ccy,
                          });
                        }}
                      />
                      <label htmlFor="buy-radio">{ccy}</label>
                    </div>
                  );
                }
              )}
            </div>

            <label>Amount:</label>
            <input
              type="text"
              name="amount"
              onChange={(event) => {
                fxDispatch({
                  type: "SET_AMOUNT",
                  payload: event.target.value,
                });
              }}
            />
          </form>
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
          {tradeConfirmationMessage && tradeConfirmationMessage}
        </div>
      )}
    </div>
  );
}
