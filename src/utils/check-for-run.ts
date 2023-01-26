function checkRun(sortedArr: number[]): number[] {
  let run = 0;
  let subArr: number[] = [];

  for(let i = 0; i < sortedArr.length - 1; i++) {
      if(sortedArr[i] + 1 === sortedArr[i + 1]) {
          run++;
          subArr.push(sortedArr[i]);
          if(run === 4) {
              subArr.push(sortedArr[i + 1]);
              return subArr;
          }
      } else {
          run = 0;
          subArr = [];
      }
  }
  return [];
}

export default checkRun;
