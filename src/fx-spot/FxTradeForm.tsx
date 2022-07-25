import React, { ChangeEvent } from "react";
import { FxPriceByCcyPair } from "./useGetFxPrices";
import { getCcyKey } from "./getCcyKey";
import { FxFormState } from "./fxFormReducer";
import { BuySell } from "./fxFormReducer";

export interface FxTradeFormProps {
  fxFormState: FxFormState;
  handleBuySellChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCurrencyChange: (ccy: string) => void;
  prices: FxPriceByCcyPair;
}

export function FxTradeForm({
  fxFormState,
  handleBuySellChange,
  handleCurrencyChange,
  handleAmountChange,
  prices,
}: FxTradeFormProps) {
  return (
    <form>
      <div>
        <input
          type="radio"
          id="buy-radio"
          name="buy"
          value={BuySell.Buy}
          checked={fxFormState.buySell === BuySell.Buy}
          onChange={handleBuySellChange}
        />
        <label htmlFor="buy-radio">Buy</label>
        <input
          type="radio"
          id="sell-radio"
          name="sell"
          value={BuySell.Sell}
          checked={fxFormState.buySell === BuySell.Sell}
          onChange={handleBuySellChange}
        />
        <label htmlFor="sell-radio">Sell</label>
      </div>

      <div style={{ display: "flex" }}>
        {Object.values(prices[getCcyKey(fxFormState.ccyPair)].ccyPair).map(
          (ccy) => {
            return (
              <div key={ccy}>
                <input
                  type="radio"
                  id={`${ccy}-currency-radio`}
                  name={`${ccy}-currency`}
                  value={ccy}
                  checked={fxFormState.investmentCcy === ccy}
                  onChange={() => {
                    handleCurrencyChange(ccy);
                  }}
                />
                <label htmlFor="buy-radio">{ccy}</label>
              </div>
            );
          }
        )}
      </div>

      <label htmlFor="amount">Amount:</label>
      <input
        id="amount"
        type="text"
        name="amount"
        onChange={(event) => {
          handleAmountChange(event);
        }}
      />
    </form>
  );
}
