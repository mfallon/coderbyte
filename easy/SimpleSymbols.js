function SimpleSymbols(str) {
  // gather any candidates into an array
  const groups = str.match(/[\+|=][a-z][\+|=]/gi);
  // start/end of string is testable with a single regexp
  if (/^[a-z]|[a-z]$/i.test(str) || groups.length == 0) {
    return false;
  }
  return groups.every(group => /\+[a-z]\+/i.test(group));
}
SimpleSymbols(readline());
