function ScaleBalancing(strArr) {
  if (Object.prototype.toString.apply(strArr) !== '[object Array]' ||
    strArr.length !== 2 || strArr[0].match(/\d+/g).length !== 2 || strArr[1].match(/\d+/g).length < 2) {
    return `strArr ${strArr} does not match expected format`;
  }
  const [scales, weights] = strArr.map(str => str.match(/\d+/g).map(n => Number(n)));
  const add = ([a, b]) => a + b;
  const subtract = ([a, b]) => b > a ? b - a : a - b;
  const diff = subtract(scales);
  const result = [];
  // check for single values
  weights.forEach(weight => {
    if (weight === diff && !result.includes(weight)) {
      result.push(weight);
    }
  });
  // now look for composite values
  if (result.length === 0) {
    let index = 0;
    while (index < weights.length) {
      const weight = weights[index];
      index ++;
      const weightsCopy = weights.slice();
      weightsCopy.splice(weightsCopy.indexOf(weight), 1);
      for (let i = 0; i < weightsCopy.length; i ++) {
        if (add([weightsCopy[i], weight]) === diff ||
          subtract([weightsCopy[i], weight]) === diff) {
          result.push(weight, weightsCopy[i]);
          index = weights.length;
          break;
        }
      }
    }
  }
  return result.length ?
    result.sort().toString() :
    'not possible';
}
ScaleBalancing(readline());
