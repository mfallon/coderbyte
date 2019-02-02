/****************** EightQueens **********************/
function EightQueens(strArr) {
  const steps = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
  const max = 8;
  const parseArgs = s => s.map(e => e.match(/\d/g).map(n => Number(n)));
  const unParseArr = arr => arr ? `(${arr.join(',')})` : arr;
  const check = (needle, haystack) => haystack.indexOf(unParseArr(needle)) !== -1;
  const move = (n, d) => {
    const limit = d > 0 ? max : 1;
    let val = n;
    return {
      next: () => {
        let nextVal = val + (1 * d);
        if (nextVal === val || (d > 0 && nextVal > limit) || (d < 0 && nextVal < limit)) {
          return {
            value: val,
            done: true
          };
        }
        val = nextVal;
        return {
          value: nextVal,
          done: false
        };
      }
    };
  };
  const moveByPath = ([x, y], [xd, yd], coords) => {
    const [moveX, moveY] = [move(x, xd), move(y, yd)];
    let moveNextX = moveX.next(), moveNextY = moveY.next();
    do {
      if (check([moveNextX.value, moveNextY.value], coords)) {
        return [moveNextX.value, moveNextY.value];
      }
      moveNextX = moveX.next();
      moveNextY = moveY.next();
    } while (!moveNextX.done || !moveNextY.done);
    return false;
  };
  const main = (arr) => {
    let found = false;
    const queens = parseArgs(arr);
    for(let i = 0; i < queens.length, !found; i ++) {
      for(let j = 0; j < steps.length, !found; j++) {
        let hit = moveByPath(queens[i], steps[j], arr);
        if (hit) {
          found = `${queens[i]} --> ${hit}`;
        }
      }
    }
    return found;
  }
  return main(strArr);
}
