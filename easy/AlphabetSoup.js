function AlphabetSoup(str) {
  return str
    .trim()
    .match(/\w/gi)
    .sort()
    .join('');
}
AlphabetSoup(readline());
