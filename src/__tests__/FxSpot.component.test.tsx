import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FxSpot } from "../Components/FxSpot.component";
import { FxPriceByCcyPair } from "../CustomHooks/useGetFxPrices";
import userEvent from "@testing-library/user-event";

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

  it("should not be able to trade if no amount was entered", async () => {
    render(<FxSpot />);
    const tradeButton = await screen.findByRole("button", { name: /trade/i });
    expect(tradeButton).toBeDisabled();
  });

  it("should be able to buy and show success message", async () => {
    render(<FxSpot />);
    const amountInput = await screen.findByRole("textbox", { name: /amount/i });
    const tradeButton = await screen.findByRole("button", { name: /trade/i });
    await userEvent.type(amountInput, "1000");
    await userEvent.click(tradeButton);
    const successMessage = await screen.findByText(/bought/i);
    expect(successMessage).toHaveTextContent("Bought 1000 EUR for 1165.73 USD");
  });

  it("should be able to sell and show success message", async () => {
    render(<FxSpot />);
    const amountInput = await screen.findByRole("textbox", { name: /amount/i });
    const tradeButton = await screen.findByRole("button", { name: /trade/i });
    const sellRadio = await screen.findByRole("radio", { name: /sell/i });
    await userEvent.type(amountInput, "1000");
    await userEvent.click(sellRadio);
    await userEvent.click(tradeButton);
    const successMessage = await screen.findByText(/sold/i);
    expect(successMessage).toHaveTextContent(
      "Sold 1000 EUR for 1165.8500000000001 USD"
    );
  });
});
