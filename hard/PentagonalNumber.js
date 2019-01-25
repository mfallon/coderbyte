function PentagonalNumber(num) {
  if (num < 1) return `${num} is not a valid number`;
  return (5 * Math.pow(num, 2) - 5 * num + 2) / 2;
}
PentagonalNumber(readline());
