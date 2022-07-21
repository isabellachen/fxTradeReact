import { FxSpotActions, FxSpotState } from "./fxSpotReducer";

export interface FxComponentProps {
  fxState: FxSpotState;
  fxDispatch: React.Dispatch<FxSpotActions>;
}
