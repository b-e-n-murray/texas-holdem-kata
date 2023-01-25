function checkForFlush(removedValues: string[]): boolean {
  // ['♥', '♠', '♠', '♥', '♠', '♠', '♦']
  // [h, s, d]
  const uniqueSuits: string[] = [];
  for (const suit of removedValues) {
    if (!uniqueSuits.includes(suit)) {
      uniqueSuits.push(suit);
    }
  }
  if (uniqueSuits.length > 3) {
    return false;
  } else return true;
}

export default checkForFlush;
