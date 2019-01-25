function LongestWord(sen) {
  // grab words from sentence accounting for any apostrophes
  var words = sen.match(/[a-z0-9']+/gi);

  // sort the words in-place longest to shortest
  words.sort((a, b) => b.length - a.length);

  // return the first member of array
  return words.shift();
}

// keep this function call here
// to see how to enter arguments in JavaScript scroll down
LongestWord(readline());
