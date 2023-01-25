function removeSuits(combinedHand: string[]): string[] {
  const removedSuits = combinedHand.map((card) => {
    return card.length === 2 ? card[0] : card.slice(0, 2);
  });
  return removedSuits;
}

export default removeSuits;
