import removeSuits from "../utils/remove-suits";

test("removeSuits fn takes an array of cards and removes the suit icons", () => {
  expect(removeSuits(["7♠", "5♠", "9♠", "J♠", "10♠"])).toEqual([
    "7",
    "5",
    "9",
    "J",
    "10",
  ]);
});
