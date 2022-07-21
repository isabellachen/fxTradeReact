import React from "react";
import { FxPriceByCcyPair } from "../CustomHooks/useGetFxPrices";
import { getCcyKey } from "../modules/getCcyKey";
import { BuySell } from "./fxSpotReducer";
import { FxComponentProps } from "./interfaces";

export function FxTradeForm({ fxState, fxDispatch }: FxComponentProps) {
  return (
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
          }}
        />
        <label htmlFor="sell-radio">Sell</label>
      </div>

      <div style={{ display: "flex" }}>
        {Object.values(
          (fxState.prices as FxPriceByCcyPair)[getCcyKey(fxState.ccyPair)]
            .ccyPair
        ).map((ccy) => {
          return (
            <div key={ccy}>
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
        })}
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
  );
}
