import checkRun from "./check-for-run";
import removeSuits from "./remove-suits";

function checkForStraight(combinedHand: string[]): number[] {
  const values = removeSuits(combinedHand).map((card: string | number) => {
    return card === "A"
      ? (card = 14)
      : card === "K"
      ? (card = 13)
      : card === "Q"
      ? (card = 12)
      : card === "J"
      ? (card = 11)
      : Number(card);
  });
  const sortedArr = values.sort((a, b) => a - b);
  console.log(checkRun(sortedArr));
  return checkRun(sortedArr);
}

export default checkForStraight;
