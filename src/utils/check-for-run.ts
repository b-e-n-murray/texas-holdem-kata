function checkRun(sortedArr: number[]): Record<number, number[]> {
    let foundStraights: Record<number, number[]> = {}
    for (let startingNum = 0; startingNum < 4; startingNum++) {
        let run = 0;
        let subArr: number[] = [];
        for (let j = startingNum; j < sortedArr.length - 1; j++) {
            if (sortedArr[j] + 1 === sortedArr[j + 1]) {
                run++;
                subArr.push(sortedArr[j]);
                if (run === 4) {
                    subArr.push(sortedArr[j + 1]);
                    let duplicateFound = false;
                    for (const value of Object.values(foundStraights)) {
                        if (value.length === subArr.length && value.every((v, i) => v === subArr[i])) {
                            duplicateFound = true;
                            break;
                        }
                    }
                    if (!duplicateFound) {
                        foundStraights[startingNum + 1] = subArr;
                    }
                    j = sortedArr.length - 1;
                }
            } else {
                run = 0;
                subArr = [];
            }
        }
    }
    return foundStraights;
}



export default checkRun;
console.log(checkRun([2, 3, 4, 5, 6, 9, 10]))
console.log(checkRun([2, 2, 4, 5, 6, 7, 8]))
console.log(checkRun([2, 3, 4, 5, 6, 7, 8]))


//Note: fn may need to be modified to account for a river of, for example:
// [2, 3, 4, 5, 6]
// Where the player's hand is:
// [7, 8]
//The player will win with a straight/straight flush but the sequence should be:
//[4, 5, 6, 7, 8]
//The checkRun fn currently returns the first found sequence of 5. 


// [2, 3, 4, 5, 6, 7, 8]
// [2, 3, 4, 5, 6, 7, 12]

//If suits are negligible, the highest ranking sequence should be returned
//If suits are, for example:
//[2h, 3h, 4h, 5h, 6c], with hand: [6h, 7d]...
//player should win with

//[2h, 3h, 4h, 5h, 6h] (as opposed to): [3h, 4h, 5h, 6c, 7d]
//    straight-flush        vs               straight

// ========> need to check for straight flush first
// ==> may need to:
//  check for ALL straights in a combined hand, (three maximum - if 7 card straight)
//  check each straight for SF - if either is SF - return SF and end.
// (could perhaps call checkForStraightFlush in checkForStraight...?)
// if not, compare the final index of each straight and return the highest

// [2, 3, 4, 5, 6, 7, 8]
// 1. [2, 3, 4, 5, 6]
// 2. [3, 4, 5, 6, 7]
// 3. [4, 5, 6, 7, 8]
//{1: [2, 3, 4, 5, 6], 2: [3, 4, 5, 6, 7], 3: [4, 5, 6, 7, 8]}
// ===> pass to check-for-straight-flush fn - 
// if only one is straight flush, return that straight
// if more than one, compare final index and return straight with higher final value
