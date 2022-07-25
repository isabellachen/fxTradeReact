import React from "react";
import { getCcyKey } from "./getCcyKey";
import { FxPriceByCcyPair } from "./useGetFxPrices";
import { CcyPair } from "./fxFormReducer";
interface PriceDisplayProps {
  prices: FxPriceByCcyPair;
  selectedCcyPair: CcyPair;
}

export function PriceDisplay({ prices, selectedCcyPair }: PriceDisplayProps) {
  return (
    <div className="mt1 mb1" style={{ display: "flex" }}>
      <div className="priceBox mr1">
        <div>Bid</div>
        {prices && (
          <div title="Bid">{prices[getCcyKey(selectedCcyPair)].bid}</div>
        )}
      </div>
      <div className="priceBox">
        <div>Ask</div>
        {prices && (
          <div title="Ask">{prices[getCcyKey(selectedCcyPair)].ask}</div>
        )}
      </div>
    </div>
  );
}
