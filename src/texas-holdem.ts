//test comment for new local workspace

import countOccurrences from "./utils/count-occurrences";
import checkForFlush from "./utils/check-for-flush";
import removeSuits from "./utils/remove-suits";
import removeValues from "./utils/remove-values";
import checkForStraightFlush from "./utils/check-for-straight-flush";
import checkForStraight from "./utils/check-for-straight";

function hand(holeCards: string[], communityCards: string[]) {
  const result = { type: "", ranks: [] };
  let combinedHand: string[] = [];
  for (const card of holeCards) {
    communityCards.push(card);
  }
  combinedHand = communityCards;
  console.log("full river + hand: ", combinedHand);

  //combinedHand represents the full river plus the two cards in hand

  //checking for pairs, 3OAK, 4OAK
  const occurrencesObj: Record<string, number> = {};
  for (const card of removeSuits(combinedHand)) {
    if (countOccurrences(combinedHand, card) > 1) {
      occurrencesObj[card] = countOccurrences(combinedHand, card);
    }
  }
  console.log("occurrences: ", occurrencesObj);

  //if nothing
  if (
    Object.keys(occurrencesObj).length === 0 &&
    Object.keys(checkForStraight(combinedHand)).length === 0 &&
    checkForFlush(combinedHand) === false
  ) {
    result.type = "nothing";
  }

  //if pair...
  if (
    Object.keys(occurrencesObj).length === 1 &&
    occurrencesObj[Object.keys(occurrencesObj)[0]] === 2
  ) {
    //if the occurrencesObj obj has only one key/val pair, and its value is 2
    result.type = "pair";
  }
  //if two pair...
  if (
    Object.keys(occurrencesObj).length === 2 &&
    occurrencesObj[Object.keys(occurrencesObj)[0]] === 2 &&
    occurrencesObj[Object.keys(occurrencesObj)[1]] === 2
  ) {
    //if the occurrencesObj obj has two key/val pairs, and both values are 2
    result.type = "two pair";
  }
  //if 3OAK...
  if (
    Object.keys(occurrencesObj).length === 1 &&
    occurrencesObj[Object.keys(occurrencesObj)[0]] === 3
  ) {
    //     && checkForStraight(combinedHand) === false
    //if the occurrencesObj obj has only one key/val pair, and its value is 3
    result.type = "three-of-a-kind";
  }
  //if straight...
  if (
    Object.keys(checkForStraight(combinedHand)).length === 1 &&
    checkForFlush(removeValues(combinedHand)) === false
  ) {
    result.type = "straight";
  }

  //if flush...
  if (
    Object.keys(checkForStraight(combinedHand)).length === 0 &&
    checkForFlush(removeValues(combinedHand)) === true
  ) {
    result.type = "flush";
  }
  //if full-house (need to check for 2,3 && 3,2)
  if (
    Object.keys(occurrencesObj).length === 2 &&
    occurrencesObj[Object.keys(occurrencesObj)[0]] === 3 &&
    occurrencesObj[Object.keys(occurrencesObj)[1]] === 2
  ) {
    //     && checkForStraight(combinedHand) === false
    //if the occurrencesObj obj has only one key/val pair, and its value is 3
    result.type = "full house";
  }
  if (
    Object.keys(occurrencesObj).length === 2 &&
    occurrencesObj[Object.keys(occurrencesObj)[0]] === 2 &&
    occurrencesObj[Object.keys(occurrencesObj)[1]] === 3
  ) {
    //     && checkForStraight(combinedHand) === false
    //if the occurrencesObj obj has only one key/val pair, and its value is 3
    result.type = "full house";
  }

  //if 4OAK...
  if (
    Object.keys(occurrencesObj).length === 1 &&
    occurrencesObj[Object.keys(occurrencesObj)[0]] === 4
  ) {
    //if the occurrencesObj obj has only one key/val pair, and its value is 4
    result.type = "four-of-a-kind";
  } else if (
    (Object.keys(occurrencesObj).length === 2 &&
      occurrencesObj[Object.keys(occurrencesObj)[0]] === 4) ||
    occurrencesObj[Object.keys(occurrencesObj)[1]] === 4
  ) {
    //if the occurrences obj has only two key/val pairs, and one of the values is 4
    result.type = "four-of-a-kind";
  }
  //if straight-flush
  if (
    Object.keys(checkForStraight(combinedHand)).length > 1 &&
    checkForFlush(removeValues(combinedHand))
  ) {
    result.type =
      checkForStraightFlush(checkForStraight(combinedHand), combinedHand) ===
      true
        ? "straight-flush"
        : "flush";
  }
  return result;
  //ranks val can be determined by combining arrays and removing all repeated values (and suits)
  //need to ordered by significance - can be done by value EXCEPT for pair, 3OAK, 4OAK, full-house
  //(player could have an A in hand that does not contribute to win, therefore it would not be their highest ranking card)

  // function findRanks(removedSuits) {

  // }
}

console.log(hand(["K♠", "J♦"], ["J♣", "K♥", "9♥", "2♥", "3♦"]));
console.log(hand(["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"]));

export default hand;

/*

NOTES (made prior to code)

Nothing conditions:
- countOccurrences returns 0  for all values
- checkForFullHouse returns false
- checkForFlush returns false
- checkForStraight returns false

Pair conditions:
- countOccurrences returns 2 for only one value in hand
- checkForFullHouse returns false
- checkForFlush returns false (player can have a pair but creating a flush is a better score - kata may keep these separate)

Two Pair conditions: 
- countOccurrences returns 2 for two different values in hand
- checkForFullHouse returns false

3-of-a-kind conditions:
- countOccurrences returns 3 for only one value in hand

Straight conditions:
- checkForFlush returns false

Flush conditions:
- checkForFlush returns true
- checkForStraight returns false

Full house condtions:
- countOccurrences returns 2 for one value, and 3 for another

4-of-a-kind conditions:
- countOccurrences returns 4 for only one value in hand

Straight flush condtions:
- checkForFlush returns true
- checkForStraight returns true

ranks - refers to each unique value in the final river after players hand has been inserted
*/
