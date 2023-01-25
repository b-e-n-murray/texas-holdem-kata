function countOccurrences(combinedHand: string[], target: string) {
  let occurrences = 0;
  for (const card of combinedHand) {
    if (card.includes(target)) {
      occurrences += 1;
    }
  }
  return occurrences;
}

export default countOccurrences;
