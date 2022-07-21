export function getCcyKey({ ccy1, ccy2 }) {
  console.log("AAA", ccy1, ccy2);
  return `${ccy1.toLowerCase()}${ccy2.toLowerCase()}`;
}
