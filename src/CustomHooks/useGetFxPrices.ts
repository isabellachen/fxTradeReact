import { useEffect, useState } from "react";
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

export function useGetFxPrices(): { prices: FxPriceByCcyPair | undefined } {
  const [prices, setPrices] = useState<FxPriceByCcyPair | undefined>();

  useEffect(() => {
    const { subscribe, unsubscribe } = fxRateSubscriber({
      onReceive: (price: any) => setPrices(price),
    });
    subscribe();
    return () => unsubscribe();
  }, []);

  return { prices };
}
