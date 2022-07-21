import React from "react";
import { getCcyKey } from "../modules/getCcyKey";
import { FxSpotState } from "./fxSpotReducer";

export function PriceDisplay({ fxState }: { fxState: FxSpotState }) {
  return (
    <div className="mt1 mb1" style={{ display: "flex" }}>
      <div className="priceBox mr1">
        <div>Bid</div>
        {fxState.prices && (
          <div title="Bid">
            {fxState.prices[getCcyKey(fxState.ccyPair)].bid}
          </div>
        )}
      </div>
      <div className="priceBox">
        <div>Ask</div>
        {fxState.prices && (
          <div title="Ask">
            {fxState.prices[getCcyKey(fxState.ccyPair)].ask}
          </div>
        )}
      </div>
    </div>
  );
}
