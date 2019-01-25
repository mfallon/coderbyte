function KaprekarsConstant(num) {
   // legal fixed digit values are 3 and 4,
  // others produce a kaprekar repeating series;
  const fixedDigits = 4;

  /**
   * @param num {string}
   * @returns {boolean}
   */
  const validateNumber = num => {
    // Rule 1: num length meets min/max criteria
    if (num.length < 2 ||
      num.length > fixedDigits) {
      console.error(`Number provided should between 2 and ${fixedDigits} digits long`);
      return false;
    }
    // Rule 2: num is at least two distinct digits
    const distinct = [];
    num.split('').forEach(n => {
      if (!distinct.includes(n)) {
        distinct.push(n);
      }
    });
    if (distinct.length < 2) {
      console.error("Number provided should have at least 2 distinct digits");
      return false;
    }
    return true;
  };

  /**
   * @param count {number}
   * @param next {string}
   * @returns {number}
   */
  const kaprekarFunc = count => next => {

    // prepare operands: first in desc, then in asc (default)
    const op1 = next.split('').sort((a, b) => b - a).join('');
    const op2 = next.split('').sort().join('');

    // calc result
    let result = String(op1 - op2).padStart(fixedDigits, '0');
    // iterate until the number passed is the same as result (i.e. Kaprekar's constant has been reached)
    for(;;) {
      if (result == next)
        return count;
      else {
        return kaprekarFunc(++count)(result);
      }
    }

    return count;
  };

  return validateNumber(`${num}`) ?
    kaprekarFunc(0)(`${num}`) :
    num;
}

// keep this function call here
KaprekarsConstant(readline());
