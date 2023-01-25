function checkRun(sortedArr: number[]): number[] {
  let run = 0;
  let index = 0;
  let currentVal = sortedArr[index];
  let straightArr = [];
  while (run !== 5) {
    let nextVal = sortedArr[index + 1];
    //[3, 6, 10, 11, 12, 13, 14]
    // run: 4
    // [10, 11, 12, 13]
    while (nextVal !== undefined) {
      if (currentVal + 1 === nextVal) {
        run++;
        straightArr.push(currentVal);
        currentVal = nextVal;
        index++;
      } else {
        run *= 0;
        currentVal = nextVal;
        straightArr = [];
        index++;
      }
    }
    if (currentVal - 1 === straightArr[straightArr.length - 1]) {
      run++
    }
    else return [];
  }
  return run === 5 ? straightArr : [];
}

export default checkRun;
