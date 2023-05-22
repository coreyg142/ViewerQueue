export function getWeightedRandomIndex(queuedNames: Array<string>): number {
  if (queuedNames.length === 1) return 0;

  const maxWeight = 100;
  const minWeight = 20;

  const weights = queuedNames.map(
    (_, index) => maxWeight - ((maxWeight - minWeight) / (queuedNames.length - 1)) * index
  );

  for (let i = 1; i < weights.length; i++) {
    weights[i] += weights[i - 1];
  }

  const random = Math.random() * weights[weights.length - 1];

  for (let i = 0; i < weights.length; i++) {
    if (weights[i] > random) return i;
  }

  // Should never get here
  return -1;
}
