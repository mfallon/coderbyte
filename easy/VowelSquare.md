# Vowel Square

Have the function VowelSquare(strArr) take the strArr parameter being passed which will be a 2D matrix of some arbitrary size filled with letters from the alphabet, and determine if a 2x2 square composed entirely of vowels exists in the matrix. For example: strArr is ["abcd", "eikr", "oufj"] then this matrix looks like the following: 

a b c d
e i k r
o u f j 

Within this matrix there is a 2x2 square of vowels starting in the second row and first column, namely, ei, ou. If a 2x2 square of vowels is found your program should return the top-left position (row-column) of the square, so for this example your program should return 1-0. If no 2x2 square of vowels exists, then return the string not found. If there are multiple squares of vowels, return the one that is at the most top-left position in the whole matrix. The input matrix will at least be of size 2x2. 

Use the Parameter Testing feature in the box below to test your code with different arguments.

## Notes

Went off in the wrong logical direction to begin with, but then realised much later what I needed to do.

```javascript

/****************** VowelSquare **********************/
/*
https://www.coderbyte.com/editor/guest:Vowel%20Square:JavaScript

// expect(VowelSquare(["abcd", "eikr", "oufj"])).toEqual("1-0");
// expect(VowelSquare(["aqrst", "ukaei", "ffooo"])).toEqual("1-2");
// expect(VowelSquare(["gg", "ff"])).toEqual("not found");
// expect(VowelSquare(["aqrst", "kuaei", "ffhoo"])).toEqual("1-3");
// expect(VowelSquare(["eeei", "ffgi", "kkmo"])).toEqual("not found");
// expect(VowelSquare(["aeeekmoo", "kmnouvoo", "frrsfsto"])).toEqual("0-6");
*/

function VowelSquare1(strArr) {
  // optional tes
  if (Object.prototype.toString.apply(strArr) !== '[object Array]' ||
    strArr.length < 2) {
    return `${strArr} does not match expected format`;
  }
  // traverse array getting positions of vowels
  // need library of chars as to what constitutes a vowel
  // determining coincident vowels...?
  /*
    if we're looking for 2,2 squares, then the modulo of fixed amount

    row1: position of vowel: -1
    row2: position of (adjacent) vowels: 0, 1 --> length % 2 = 0
    row3: position of vowels: 0, 1 --> length % 2 = 0

    vowels need adjacency. a single vowel on it's own is no help

    row1: get start position of adjecent vowels: -1
    row2: ": 0 <-- has the property of being adjecent with at least 1 other (could be more).
    row3: ": 0 <-- does this occur with the row above?
  */
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const size = 2; // 2x2 squares
  const hits = strArr.reduce((prev, next, i) => {
    const res = [];
    vowels.forEach((letter, index) => {
      if(next.indexOf(letter) !== -1) {
        // if the next vowel found is non-contiguous
        // console.log(next, letter, next.indexOf(letter), res[0]);
        if (res[0] === undefined) {
          // needs to be +/- 1
        } else if(res[0] + 1 !== next.indexOf(letter)) {
          // res[0] is defined but this find is not res[0] + 1, therefore non-contiguous
          // console.log('non-contiguous:', res[0], letter, next.indexOf(letter), next.toString());
        } else if(res[0] > next.indexOf(letter)) {
        }
        //
        res[0] = res[0] === undefined ?
          next.indexOf(letter) : res[0] > next.indexOf(letter) ?
            next.indexOf(letter) : res[0];;
        res[1] = res[1] === undefined ?
          next.lastIndexOf(letter) > res[0] ?
            next.lastIndexOf(letter) : 1 : res[1] + 1;
      } else {
        // reset res as non-contiguous
        if (res.length > 1 && res[1] < size) {
          // res.length = 1;
          // console.log(res);
          // i've no way of telling if between the first position and the last
          // whether theres a break in between
          //
          // but this is a miss, so I should check
        }
      }
    });
    // console.log(res);
    if (res.length === 2 && res[1] > 1) {
      prev.push(res);
    } else {
      prev.push(null);
    }
    return prev;
  }, []);
  // console.log(JSON.stringify(hits));

  let result = null;
  const add = ([a, b]) => a + b;
  const subtract = ([a, b]) => b > a ? b - a : a - b;
  if (hits.length > 0) {
    let prev = hits.shift();
    let row = 0;
    while(hits.length > 0) {
      const next = hits.shift();
      // just test both sides:
      // >| right edge test
      // next[0] <= add(prev) - size
      // |< left edge test
      // prev[0] <= add(next) - size
      if (prev && next &&
        next[0] <= add(prev) - size &&
        prev[0] <= add(next) - size) {
        // console.log('rhs: ', next[0], ' <= ', add(prev) - size,
        // ', lhs: ', prev[0], ' <= ', add(next) - size);
        result = `${row}-${prev[0]}`;
      }
      prev = next;
      row += 1;
    }
  }
  return result ?
    result : 'not found';
};
/*
xx       0<=3    prev[0] <= add(next) - size
+---+
 xxxx


    xx   4<=3    prev[0] <= add(next) - size
+---+
 xxxx


 xxxx    0<=3    next[0] <= add(prev) - size
+---+
xx               next[0] >= prev[0

*/
function VowelSquare2(strArr) {
  const add = ([a, b]) => a + b;
  const subtract = ([a, b]) => b > a ? b - a : a - b;
  const size = 2;
  const remapped = strArr.map(row =>
    row.split('').map(letter => ['a','e','i','o','u'].includes(letter) ? 1 : 0));
  const contiguous = remapped.map((row, rowIndex) => {
    let results = [];
    row.forEach((flag, index) => {
      if (flag) {
        if (results.length === 0) {
          results = [index, 1];
        } else {
          results[1] ++;
        }
      } else {
        if (results.length &&
          results[1] < size) {
          results.length = 0;
        }
      }
    });
    return results;
  });
  console.log(JSON.stringify(contiguous));
  let result, row = 0;
  if (contiguous.length > 0) {
    let prev = contiguous.shift();
    while(contiguous.length > 0) {
      const next = contiguous.shift();
      if (prev.length && next.length) {
        if (prev[1] > next[1]) {
          if (next[0] <= add(prev) - size &&
            next[0] >= prev[0]) {
            result = `${row}-${prev[0]}`;
          }
        } else if(next[1] > prev[1]) {
          if (prev[0] <= add(next) - size &&
            prev[0] >= next[0]) {
            result = `${row}-${prev[0]}`;
          }
        } else {
          if (prev[0] == next[0]) {
            result = `${row}-${prev[0]}`;
          }
        }
      }
      prev = next;
      row ++;
      if (result) {
        break;
      }
    }
  }
  return result ?
    result : 'not found';
}

// would be nice if we could come up with composite rows
// with each bit AND'd with it's column bit
/*
var cols = [];
remapped.forEach((row, rowIndex) => {
  row.forEach((el, elIndex) => {
	if (!cols[elIndex]) {
		cols[elIndex] = [];
    }
	cols[elIndex][rowIndex] = el;
  });
});
console.log(cols);
*/

/*
ok, so another way, is to take a curr row and a next row.
iterate through curr, and accummulate score when curr[i] && next[i] > size successively
the first time you encounter this is the required answer
*/

/*
work with remapped:
1. take first N = size rows into a 'buffer'.
2. Curr points to the N-1 line and will perform comparisons for all lines back to 0
    curr => line[size] && line[size-1] && ...
   such that you can line up each col in all lines into a boolean &&
   you might have to collectOperands back to 0
*/

/*
                     ["aeeekmoo", "kmnouvoo", "frrsfsto"]

                     ["11110011", "00011111", "00000001"]

 rowsArray          +-----------------------------------+

                     0   [1, 1, 1, 1, 0, 0, 1, 1]                <-----+ numRows (at a time)

                     1   [0, 0, 0, 1, 1, 0, 1, 1]
rowIndex +-----> - - - - - - - - - - - - - - - - - - - - - - - - - 
                     2   [0, 0, 0, 0, 0, 0, 0, 1]

                     3    ^
                          |
                          |
                          |
                          + colIndex

*/
```
