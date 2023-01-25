function removeValues(combinedHand: string[]): string[] {
  const removedValues = combinedHand.map((card) => {
    return card.length === 2 ? card[1] : card[2]; //'Q♥'' => '♥', '10♥'' => '♥'
  });
  return removedValues;
}

export default removeValues;
