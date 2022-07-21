import { FxPriceByCcyPair } from "../CustomHooks/useGetFxPrices";
import { FxSpotActions, FxSpotState } from "./fxSpotReducer";

export interface OnFxRatesReceived {
  onReceive: (prices: FxPriceByCcyPair) => void;
}
export interface FxComponentProps {
  fxState: FxSpotState;
  fxDispatch: React.Dispatch<FxSpotActions>;
}
