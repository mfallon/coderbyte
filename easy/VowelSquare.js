function VowelSquare(strArr) {
  const extractCol = (rows, colIndex, rowIndex, size) => {
    const col = [];
    for(let j = rowIndex; j >= 0 && j >= rowIndex - (size - 1); j--) {
      col.push(rows[j][colIndex]);
    }
    return col;
  };
  const findSquare = (rows, size) => {
    let retVal = null, count = 0, rowIndex = size - 1;
    while(rowIndex < rows.length) {
      for(let colIndex = 0; colIndex < rows[rowIndex].length; colIndex ++) {
        const result = extractCol(rows, colIndex, rowIndex, size).every(el => el);
        count = result ? count + 1 : 0;
        if (count >= size) {
          retVal = `${rowIndex - (size - 1)}-${colIndex - (size - 1)}`;
          break;
        }
      }
      rowIndex = retVal !== null ? rows.length : rowIndex + 1;
    }
    return retVal !== null ? retVal : 'not found';
  };
  const remapped = strArr.map(row =>
    row.split('').map(letter => ['a','e','i','o','u'].includes(letter) ? 1 : 0));
  return findSquare(remapped, 2);
}
VowelSquare(readline());
