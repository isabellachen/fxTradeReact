import { useEffect, useState } from "react";
import { FxSpotActions } from "../Components/fxSpotReducer";
import { fxRateSubscriber } from "../modules/fxRateSubscriber";

export interface FxPriceInfo {
  ccyPair: {
    ccy1: string;
    ccy2: string;
  };
  ask: string;
  bid: string;
}

export type FxPriceByCcyPair = Record<string, FxPriceInfo>;

export function useGetFxPrices(
  fxDispatch: React.Dispatch<FxSpotActions>
): null {
  useEffect(() => {
    const { subscribe, unsubscribe } = fxRateSubscriber({
      onReceive: (prices: FxPriceByCcyPair) => {
        fxDispatch({ type: "GET_PRICES_SUCCESS", payload: prices });
      },
    });
    subscribe();
    return () => unsubscribe();
  }, []);

  return null;
}
