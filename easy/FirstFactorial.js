function FirstFactorial(num) {
    if (num < 2) {
        return 1;
    }
    return num * FirstFactorial(num - 1);
}
FirstFactorial(readline());
