export function hand(holeCards: string[], communityCards: string[]) {
  const result = { type: '', ranks: [] }
  let combinedHand: string[] = []
  for (const card of holeCards) {
    communityCards.push(card)
  }
  combinedHand = communityCards
  console.log("full river + hand: ", combinedHand)

  //combinedHand now represents the full river plus the two cards in hand

  //function to be used for checking pairs/3-of-a-kind/4-of-a-kind
  function countOccurrences(combinedHand: string[], target: string) {
    let occurrences = 0
    for (const card of combinedHand) {
      if (card.includes(target)) {
        occurrences += 1
      }
    }
    return occurrences
  }
  //checking for pairs, 3OAK, 4OAK
  let occurrencesObj: Record<string, number> = {}
  for (const card of removeSuits(combinedHand)) {
    if (countOccurrences(combinedHand, card) > 1) {
      occurrencesObj[card] = countOccurrences(combinedHand, card)
    }
  }
  console.log("occurrences: ", occurrencesObj)

  //if nothing
  if (Object.keys(occurrencesObj).length === 0
    && checkForStraight(combinedHand) === false
    && checkForFlush(combinedHand) === false) {
    result.type = 'nothing'
  }

  //if pair...
  if (Object.keys(occurrencesObj).length === 1 && occurrencesObj[Object.keys(occurrencesObj)[0]] === 2) {
    //if the occurrencesObj obj has only one key/val pair, and its value is 2
    result.type = 'pair'
  }
  //if two pair...
  if (Object.keys(occurrencesObj).length === 2
    && occurrencesObj[Object.keys(occurrencesObj)[0]] === 2
    && occurrencesObj[Object.keys(occurrencesObj)[1]] === 2
  ) {
    //if the occurrencesObj obj has two key/val pairs, and both values are 2
    result.type = 'two pair'
  }
  //if 3OAK...
  if (Object.keys(occurrencesObj).length === 1
    && occurrencesObj[Object.keys(occurrencesObj)[0]] === 3) {
    //     && checkForStraight(combinedHand) === false
    //if the occurrencesObj obj has only one key/val pair, and its value is 3
    result.type = 'three-of-a-kind'
  }
  //if straight...
  if (checkForStraight(combinedHand) && checkForFlush(removeValues(combinedHand)) === false) {
    result.type = 'straight'
  }

  //if flush...
  if (checkForStraight(combinedHand) === false
    && checkForFlush(removeValues(combinedHand)) === true) {
    result.type = 'flush'
  }
  //if full-house (need to check for 2,3 && 3,2)
  if (Object.keys(occurrencesObj).length === 2
    && occurrencesObj[Object.keys(occurrencesObj)[0]] === 3
    && occurrencesObj[Object.keys(occurrencesObj)[1]] === 2) {
    //     && checkForStraight(combinedHand) === false
    //if the occurrencesObj obj has only one key/val pair, and its value is 3
    result.type = 'full house'
  }
  if (Object.keys(occurrencesObj).length === 2
    && occurrencesObj[Object.keys(occurrencesObj)[0]] === 2
    && occurrencesObj[Object.keys(occurrencesObj)[1]] === 3) {
    //     && checkForStraight(combinedHand) === false
    //if the occurrencesObj obj has only one key/val pair, and its value is 3
    result.type = 'full house'
  }

  //if 4OAK...
  if (Object.keys(occurrencesObj).length === 1 && occurrencesObj[Object.keys(occurrencesObj)[0]] === 4) {
    //if the occurrencesObj obj has only one key/val pair, and its value is 4
    result.type = 'four-of-a-kind'
  }
  else if (Object.keys(occurrencesObj).length === 2
    && occurrencesObj[Object.keys(occurrencesObj)[0]] === 4
    || occurrencesObj[Object.keys(occurrencesObj)[1]] === 4) {
    //if the occurrences obj has only two key/val pairs, and one of the values is 4
    result.type = 'four-of-a-kind'
  }
  //if straight-flush
  if (checkForStraight(combinedHand) && checkForFlush(removeValues(combinedHand)) === true) {
      result.type = checkForStraightFlush(checkForStraight(combinedHand)) === true ? 'straight-flush' : 'flush'
  }
  return result
  //ranks val can be determined by combining arrays and removing all repeated values (and suits)
  //need to ordered by significance - can be done by value EXCEPT for pair, 3OAK, 4OAK, full-house
  //(player could have an A in hand that does not contribute to win, therefore it would not be their highest ranking card)


  // function findRanks(removedSuits) {

  // }
  //function to be used for checking hand for flush
  function checkForFlush(removedValues: string[]): boolean { 
    // ['♥', '♠', '♠', '♥', '♠', '♠', '♦']
    // [h, s, d]
    const uniqueSuits: string[] = []
    for (const suit of removedValues) {
      if (!uniqueSuits.includes(suit)) {
        uniqueSuits.push(suit)
      }
    }
    if (uniqueSuits.length > 3) {
      return false
    }
    else return true
  }
  //option: declare an array of the possible suits as strings
  //option: loop and count occurrences of any opposing suits, if > 2, is not a flush, otherwise it is

  // function to be used for checking hand for Straight combinations
  function checkForStraight(combinedHand: string[]): number[] | false {
    /*
    ['A♠', 'K♦', 'J♥', '5♥', '10♥', 'Q♥', '3♥']
    {A: '♠', K: ....}
    {A: 14, K: 13, ...}
    */
    const values = removeSuits(combinedHand).map((card: string | number) => {
      return card === 'A' ? card = 14 :
        card === 'K' ? card = 13 :
          card === 'Q' ? card = 12 :
            card === 'J' ? card = 11 :
              Number(card)
    })
    const sortedArr = values.sort((a, b) => a - b)
    // [ 'J', '10', '9', 'K', '3', 'Q', '2' ] => [ 2, 3, 9, 10, 11, 12, 13 ]
    //full river + hand now sorted by numerical value in asc order
    //checking for any run of five...
    //start at first value - is next value +1? if yes, add one, and continue - if get to 5, return true
    function checkRun(sortedArr: number[]): number[] | false {
      let run = 0
      let index = 0
      let currentVal = sortedArr[index]
      let straightArr = []
      while (run !== 5) {
        const nextVal = sortedArr[index + 1]
        if (currentVal + 1 === nextVal) {
          currentVal = nextVal
          if (run === 0) {
            run = 2
            straightArr.push(currentVal)
          }
          else {
            run++
            straightArr.push(currentVal)
          }
          index++
        }
        else {
          run *= 0
          currentVal = nextVal
          straightArr = []
          index++
        }
        if (nextVal === undefined) {
          return false
        }
      }
      return run === 5 ? straightArr : false
    }
    console.log(checkRun(sortedArr))
    return checkRun(sortedArr)
  }
}

//helper function that removes suits from a combined hand + river
export function removeSuits(combinedHand: string[]): string[] {
  const removedSuits = combinedHand.map((card) => {
    return card.length === 2 ? card[0] : card.slice(0, 2)
  })
  return removedSuits
}
function removeValues(combinedHand: string[]): string[] {
  const removedValues = combinedHand.map((card) => {
    return card.length === 2 ? card[1] : card[2] //'Q♥'' => '♥', '10♥'' => '♥'
  })
  return removedValues
}
function checkForStraightFlush(straightArr: number[]): boolean {
  // [10, 11, 12, 13, 14]
  const valuesToCardArr = straightArr.map((value) => {
    return JSON.stringify(value)
  })
  // ['10', '11', '12', '13', '14']
  const stringsToCardArr = valuesToCardArr.map((value) => {
    if(value === '11') {
      return 'J'
    }
    if(value === '12') {
      return 'Q'
    }
    if(value === '13') {
      return 'K'
    }
    if(value === '14') {
      return 'A'
    }
    else return value
  })
  // ['10', 'J', 'Q', 'K', 'A']
  //need to get from ^ to => ['10♥', 'J♥', 'Q♥', 'K♦', 'A♠']

    // let finalArr = []
    /* for(let string of straightArr) {
          for(let card of combinedHand) {
            if(card.includes(string)) {
             finalArr.push(card)
            }
          }
    }
    // ['10♥', 'J♥', 'Q♥', 'K♦', 'A♠']*/
    //now check if this straightArr is a flush...?
  const uniqueSuits: string[] = []
  for (const suit of finalArr) {
    if (!uniqueSuits.includes(suit)) {
      uniqueSuits.push(suit)
    }
  }
  if (uniqueSuits.length > 1) {
    return false
  }
  else return true
}


console.log(hand(['K♠', 'J♦'], ['J♣', 'K♥', '9♥', '2♥', '3♦']))
console.log(hand(['A♠', 'K♦'], ['J♥', '5♥', '10♥', 'Q♥', '3♥']))
// export default hand


/*

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



