import React from "react";
import { FxPriceByCcyPair } from "./useGetFxPrices";
import { getCcyKey } from "./getCcyKey";
import { CcyPair } from "./fxFormReducer";

export interface CurrencyPairSelectorProps {
  prices: FxPriceByCcyPair;
  ccyPair: CcyPair;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CurrencyPairSelector({
  prices,
  handleChange,
  ccyPair,
}: CurrencyPairSelectorProps) {
  return (
    <div className="mt1" style={{ display: "flex" }}>
      <div>Currency Pair</div>
      <select
        value={getCcyKey(ccyPair)}
        data-testid="currency-pair-select"
        onChange={(event) => {
          handleChange(event);
        }}
      >
        {prices &&
          Object.keys(prices).map((ccyPair) => {
            return (
              <option value={ccyPair} key={ccyPair}>
                {(prices as FxPriceByCcyPair)[ccyPair].ccyPair.ccy1} /{" "}
                {(prices as FxPriceByCcyPair)[ccyPair].ccyPair.ccy2}
              </option>
            );
          })}
      </select>
    </div>
  );
}
