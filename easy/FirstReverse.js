function FirstReverse(str) {
  return str.match(/./g).reverse().join('');
}
FirstReverse(readline())
