import React from "react";
import { FxPriceByCcyPair } from "../CustomHooks/useGetFxPrices";
import { getCcyKey } from "../modules/getCcyKey";
import { FxComponentProps } from "./interfaces";

export function CurrencyPairSelector({
  fxState,
  onGetPrices,
}: FxComponentProps) {
  return (
    <div className="mt1" style={{ display: "flex" }}>
      <div>Currency Pair</div>
      <select
        value={getCcyKey(fxState.ccyPair)}
        data-testid="currency-pair-select"
        onChange={(event) => {
          const pairString = event.target.value;
          const ccyPair = (fxState.prices as FxPriceByCcyPair)[pairString]
            .ccyPair;
          onGetPrices({ type: "SET_CCY_PAIR", payload: ccyPair });
        }}
      >
        {fxState.prices &&
          Object.keys(fxState.prices).map((ccyPair) => {
            return (
              <option value={ccyPair} key={ccyPair}>
                {(fxState.prices as FxPriceByCcyPair)[ccyPair].ccyPair.ccy1} /{" "}
                {(fxState.prices as FxPriceByCcyPair)[ccyPair].ccyPair.ccy2}
              </option>
            );
          })}
      </select>
    </div>
  );
}
