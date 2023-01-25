import hand from "../texas-holdem";

test("Hand with no winning cards scores *nothing* and ranks with A,K descending...", () => {
  expect(hand(["K♠", "A♦"], ["J♣", "Q♥", "9♥", "2♥", "3♦"])).toEqual({
    type: "nothing",
    ranks: ["A", "K", "Q", "J", "9"],
  });
});

test("Player scores *pair* and ranks should contain four values...", () => {
  expect(hand(["6♠", "J♦"], ["J♣", "K♥", "9♥", "2♥", "3♦"])).toEqual({
    type: "pair",
    ranks: ["Q", "K", "J", "9"],
  });
});

test("Player scores *two pair* and ranks should contain 3 values...", () => {
  expect(hand(["K♠", "J♦"], ["J♣", "K♥", "9♥", "2♥", "3♦"])).toEqual({
    type: "two pair",
    ranks: ["K", "J", "9"],
  });
});

test("Player scores *three-of-a-kind* and ranks should contain 3 values...", () => {
  expect(hand(["4♠", "9♦"], ["J♣", "Q♥", "Q♠", "2♥", "Q♦"])).toEqual({
    type: "three-of-a-kind",
    ranks: ["Q", "J", "9"],
  });
});

test("Player scores *straight* and ranks should contain 5 values...", () => {
  expect(hand(["Q♠", "2♦"], ["J♣", "10♥", "9♥", "K♥", "3♦"])).toEqual({
    type: "straight",
    ranks: ["K", "Q", "J", "10", "9"],
  });
});

test("Player scores *flush* and ranks should contain 5 values...", () => {
  expect(hand(["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"])).toEqual({
    type: "flush",
    ranks: ["Q", "J", "10", "5", "3"],
  });
});

test("Player scores *full house* and ranks should contain 2 values...", () => {
  expect(hand(["A♠", "A♦"], ["K♣", "K♥", "A♥", "Q♥", "3♦"])).toEqual({
    type: "full house",
    ranks: ["A", "K"],
  });
});

test("Player scores *four-of-a-kind* and ranks should contain 2 values...", () => {
  expect(hand(["2♠", "3♦"], ["2♣", "2♥", "3♠", "3♥", "2♦"])).toEqual({
    type: "four-of-a-kind",
    ranks: ["2", "3"],
  });
});

test("Player scores *straight-flush* and ranks should contain 5 values...", () => {
  expect(hand(["8♠", "6♠"], ["7♠", "5♠", "9♠", "J♠", "10♠"])).toEqual({
    type: "straight-flush",
    ranks: ["J", "10", "9", "8", "7"],
  });
});

// test("", () => {
//     removeValues([]).toEqual([])
// });

// test("", () => {
//     checkForFlush([]).toEqual([])
// });

// test("", () => {
//     removeStraight([]).toEqual([])
// });

// test("", () => {
//     countOccurrences([]).toEqual([])
// })
