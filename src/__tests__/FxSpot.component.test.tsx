import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FxSpot } from "../Components/FxSpot.component";
import { FxPriceByCcyPair } from "../CustomHooks/useGetFxPrices";

const mockPrices: FxPriceByCcyPair = {
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
};

jest.mock("../CustomHooks/useGetFxPrices", () => {
  return {
    useGetFxPrices: () => {
      return {
        prices: mockPrices,
      };
    },
  };
});

describe("FxSpot Component", () => {
  it("should display the bid and ask price for default pair", () => {
    render(<FxSpot />);
    const bidDisplay = screen.getByTitle(/bid/i);
    const askDisplay = screen.getByTitle(/ask/i);
    expect(bidDisplay).toHaveTextContent("1.16573");
    expect(askDisplay).toHaveTextContent("1.16585");
  });

  it("should display the bid and ask price for user selected pair", () => {
    render(<FxSpot />);
    const ccySelect = screen.getByTestId("currency-pair-select");
    fireEvent.change(ccySelect, { target: { value: "usdchf" } });
    const bidDisplay = screen.getByTitle(/bid/i);
    const askDisplay = screen.getByTitle(/ask/i);
    expect(bidDisplay).toHaveTextContent("0.93271");
    expect(askDisplay).toHaveTextContent("0.93281");
  });
});
