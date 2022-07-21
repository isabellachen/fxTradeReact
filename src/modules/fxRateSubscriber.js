import { getRandomInt } from "./getRandomInt.js";

// Fake FX SPOT subscription.
// This would otherwise open a websocket connection
export function fxRateSubscriber({ onReceive }) {
  let subscribed;

  const subscribe = () => {
    if (subscribed) {
      return;
    }

    const createFakeUpdate = () =>
      onReceive({
        eurusd: {
          ccyPair: { ccy1: "EUR", ccy2: "USD" },
          ...fakeBidAsk("1.16", 0.00012),
        },
        eurchf: {
          ccyPair: { ccy1: "EUR", ccy2: "CHF" },
          ...fakeBidAsk("1.09", 0.00006),
        },
        usdchf: {
          ccyPair: { ccy1: "USD", ccy2: "CHF" },
          ...fakeBidAsk("0.93", 0.0001),
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
}

function withFakePips(price) {
  // add 3 digits of pips
  const pips =
    getRandomInt(1, 10) * 100 + getRandomInt(1, 10) * 10 + getRandomInt(1, 10);
  return `${price}${pips}`;
}

function fakeBidAsk(originalPrice, spread) {
  const price = Number(withFakePips(Number(originalPrice)));
  return {
    ask: ((price * 100000 + Math.ceil((spread * 100000) / 2)) / 100000).toFixed(
      5
    ),
    bid: (
      (price * 100000 - Math.floor((spread * 100000) / 2)) /
      100000
    ).toFixed(5),
  };
}
