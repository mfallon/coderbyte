function SimpleAdding(num) {
  if ( num > 1000 || num < 1 ) return 0;
  return num + SimpleAdding(num - 1);
}
SimpleAdding(readline());
