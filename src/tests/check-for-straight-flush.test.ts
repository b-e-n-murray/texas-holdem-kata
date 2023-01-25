import checkForStraightFlush from "../utils/check-for-straight-flush";

test("Takes an array of sequential numbers, reverts to array of cards as strings and returns true if flush present", () => {
  expect(
    checkForStraightFlush(
      [5, 7, 9, 10, 11],
      ["8♠", "6♠", "7♠", "5♠", "9♠", "J♠", "10♠"]
    )
  ).toEqual(true);
});

test("Takes an array of sequential numbers, reverts to array of cards as strings and returns false if no flush", () => {
  expect(
    checkForStraightFlush(
      [10, 11, 12, 13, 14],
      ["A♠", "K♦", "J♥", "5♥", "10♥", "Q♥", "3♥"]
    )
  ).toEqual(false);
});
