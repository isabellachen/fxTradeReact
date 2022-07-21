import React, { useState } from "react";
import { useGetFxPrices } from "../CustomHooks/useGetFxPrices";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CircularProgress, MenuItem, Paper } from "@mui/material";

export function FxSpot(): JSX.Element {
  const [userSelectedCcyPair, setUserSelectedCcyPair] =
    useState<string>("eurusd");
  const { prices } = useGetFxPrices();

  return (
    <div>
      {prices === undefined ? (
        <CircularProgress />
      ) : (
        <div>
          <select
            value={userSelectedCcyPair}
            data-testid="currency-pair-select"
            onChange={(event) => {
              setUserSelectedCcyPair(event.target.value);
            }}
          >
            {prices &&
              Object.keys(prices).map((ccyPair) => {
                return (
                  <option value={ccyPair} key={ccyPair}>
                    {prices[ccyPair].ccyPair.ccy1} /{" "}
                    {prices[ccyPair].ccyPair.ccy2}
                  </option>
                );
              })}
          </select>
          <div>
            <Paper>
              <div>Bid</div>
              {prices && (
                <div title="Bid">{prices[userSelectedCcyPair].bid}</div>
              )}
            </Paper>
            <Paper>
              <div>Ask</div>
              {prices && (
                <div title="Ask">{prices[userSelectedCcyPair].ask}</div>
              )}
            </Paper>
          </div>
        </div>
      )}
    </div>
  );
}
