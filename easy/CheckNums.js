function CheckNums(num1,num2) {
  if (num1 === num2) return "-1";
  return (num2 > num1).toString();
}
CheckNums(readline());
