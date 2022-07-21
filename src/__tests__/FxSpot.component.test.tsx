import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FxSpot } from "../Components/FxSpot.component";
import { FxPriceByCcyPair } from "../CustomHooks/useGetFxPrices";

jest.mock("../modules/fxRateSubscriber", () => {
  return {
    fxRateSubscriber: ({
      onReceive,
    }: {
      onReceive: (prices: FxPriceByCcyPair) => void;
    }) => {
      let subscribed: any;
      const subscribe = () => {
        if (subscribed) {
          return;
        }

        const createFakeUpdate = () =>
          onReceive({
            eurusd: {
              ccyPair: { ccy1: "EUR", ccy2: "USD" },
              ask: "1.16585",
              bid: "1.16573",
            },
            eurchf: {
              ccyPair: { ccy1: "EUR", ccy2: "CHF" },
              ask: "1.09286",
              bid: "1.09280",
            },
            usdchf: {
              ccyPair: { ccy1: "USD", ccy2: "CHF" },
              ask: "0.93281",
              bid: "0.93271",
            },
          });

        // initial data
        setTimeout(() => {
          createFakeUpdate();
        }, 0);

        subscribed = setInterval(() => {
          createFakeUpdate();
        }, 1000);
      };

      const unsubscribe = () => {
        clearInterval(subscribed);
      };

      return {
        subscribe,
        unsubscribe,
      };
    },
  };
});

describe("FxSpot Component", () => {
  it("should display the bid and ask price for default pair", async () => {
    render(<FxSpot />);
    const bidDisplay = await screen.findByTitle(/bid/i);
    const askDisplay = await screen.findByTitle(/ask/i);
    expect(bidDisplay).toHaveTextContent("1.16573");
    expect(askDisplay).toHaveTextContent("1.16585");
  });

  it("should display the bid and ask price for user selected pair", async () => {
    render(<FxSpot />);
    const ccySelect = await screen.findByTestId("currency-pair-select");
    fireEvent.change(ccySelect, { target: { value: "usdchf" } });
    const bidDisplay = await screen.findByTitle(/bid/i);
    const askDisplay = await screen.findByTitle(/ask/i);
    expect(bidDisplay).toHaveTextContent("0.93271");
    expect(askDisplay).toHaveTextContent("0.93281");
  });
});
