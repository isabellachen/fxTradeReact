import { useEffect } from "react";
import { fxRateSubscriber } from "./fxRateSubscriber";

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
  onReceive: (prices: FxPriceByCcyPair) => void
): null {
  useEffect(() => {
    const { subscribe, unsubscribe } = fxRateSubscriber({ onReceive });
    subscribe();
    return () => unsubscribe();
  }, [onReceive]);

  return null;
}
