function ChessboardTraveling(str) {
  if (/\(\d.\d\)\(\d.\d\)/.test(str) === false) {
    return `String ${str} does not match expected format`;
  }
  const [x1, y1, x2, y2] = str.match(/\d/g).map(n => Number(n));
  const diffX = x2 - x1;
  const diffY = y2 - y1;
  const factorial = n => n === 1 ? 1 : n * factorial(n - 1);
  return factorial(diffX + diffY) / (factorial(diffY) * factorial(diffX));
}
ChessboardTraveling(readline());
