import removeValues from "./remove-values";

function checkForStraightFlush(
  straightArr: number[],
  combinedHand: string[]
): boolean {
  // [10, 11, 12, 13, 14]
  const valuesToCardArr = straightArr.map((value) => {
    return JSON.stringify(value);
  });
  // ['10', '11', '12', '13', '14']
  const stringsToCardArr = valuesToCardArr.map((value) => {
    if (value === "11") {
      return "J";
    }
    if (value === "12") {
      return "Q";
    }
    if (value === "13") {
      return "K";
    }
    if (value === "14") {
      return "A";
    } else return value;
  });
  // ['10', 'J', 'Q', 'K', 'A']
  //need to get from ^ to => ['10♥', 'J♥', 'Q♥', 'K♦', 'A♠']

  const originalCardsArr = [];
  for (const string of stringsToCardArr) {
    for (const card of combinedHand) {
      if (card.includes(string)) {
        originalCardsArr.push(card);
      }
    }
  }
  // ['10♥', 'J♥', 'Q♥', 'K♦', 'A♠']
  //now check if this straightArr is a flush...?
  const originalSuits = removeValues(originalCardsArr);
  const uniqueSuits: string[] = [];
  for (const suit of originalSuits) {
    if (!uniqueSuits.includes(suit)) {
      uniqueSuits.push(suit);
    }
  }
  if (uniqueSuits.length > 1) {
    return false;
  } else return true;
}

export default checkForStraightFlush;
