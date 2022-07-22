import { useEffect } from "react";
import { FxSpotActions } from "../Components/interfaces";
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
  onGetPrices: React.Dispatch<FxSpotActions>
): null {
  useEffect(() => {
    const { subscribe, unsubscribe } = fxRateSubscriber({
      onReceive: (prices: FxPriceByCcyPair) => {
        onGetPrices({ type: "GET_PRICES_SUCCESS", payload: prices });
      },
    });
    subscribe();
    return () => unsubscribe();
  }, [onGetPrices]);

  return null;
}
