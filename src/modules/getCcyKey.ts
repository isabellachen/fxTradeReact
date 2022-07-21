import { CcyPair } from "../Components/interfaces";

export function getCcyKey({ ccy1, ccy2 }: CcyPair) {
  return `${ccy1.toLowerCase()}${ccy2.toLowerCase()}`;
}
