import checkRun from "../utils/check-for-run";

test(`loops over array of numbers sorted ascendingly,
 returns a new array of the 5 numbers
  that exist in the sequence`, () => {
  expect(checkRun([5, 7, 8, 9, 10, 11, 14])).toEqual([7, 8, 9, 10, 11]);
});

test(`loops over array of numbers sorted ascendingly,
 returns a new array of the 5 numbers
  that exist in the sequence`, () => {
  expect(checkRun([2, 3, 5, 6, 7, 8, 9])).toEqual([5, 6, 7, 8, 9]);
});

test(`loops over array of numbers sorted ascendingly,
 returns a new array of the 5 numbers
  that exist in the sequence`, () => {
  expect(checkRun([2, 3, 4, 5, 6, 7, 8])).toEqual({0: [2, 3, 4, 5, 6], 1: [3, 4, 5, 6, 7], 2: [5, 6, 7, 8, 9]});
});

test(`loops over array of numbers sorted ascendingly,
 returns an empty array if no run of 5 is found`, () => {
  expect(checkRun([3, 5, 8, 9, 10, 11, 14])).toEqual([]);
});
