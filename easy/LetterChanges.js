function LetterChanges(str) {
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  const vowels = [0, 4, 8, 14, 20];
  let updateStr = "";
  const transpose = (letter, alphabet) => {
    const pos = alphabet.indexOf(letter) < alphabet.length - 1 ?
      alphabet.indexOf(letter) + 1 : 0;
    return vowels.indexOf(pos) !== -1 ?
      alphabet[pos].toUpperCase() : alphabet[pos];
  };
  for (var i = 0; i < str.length; i++) {
    const alphabet = alpha.toUpperCase().indexOf(str[i]) !== -1 ?
      alpha.toUpperCase() : alpha;
    if (alphabet.indexOf(str[i]) !== -1) {
      updateStr += transpose(str[i], alphabet);
    } else {
      updateStr += str[i];
    }
  }
  return updateStr;
}
LetterChanges(readline());
