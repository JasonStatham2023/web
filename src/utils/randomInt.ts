export function randomInt(n, m): number {
  const aNumber = (n - 1 - m) * Math.random() + (m + 1);
  return Math.floor(aNumber);
}
