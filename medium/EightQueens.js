/****************** EightQueens **********************/

function EightQueens(strArr) {
  const parseArgs = s => s.map(e => e.match(/\d/g).map(n => Number(n)));
  const unParseArr = arr => arr ? `(${arr.join(',')})` : arr;
  const max = 8;

  // TODO: good case here to deal with only 1 coordinate, thereby eliminating 2 functions
  // or further, a base function that just manipulates the value +/- and </>
  // d = 1 | -1
  const move = (n, d) => {
    const limit = d > 0 ? max : 1;
    let val = n;
    return {
      next: () => {
        let nextVal = val + (1 * d);
        if ((d > 0 && nextVal > limit) || (d < 0 && nextVal < limit)) {
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
  const north = (coords) => {
    const max = 8;
    let [x, y] = coords;
    return {
      next: () => {
        if (y >= max) {
          return {
            value: null,
            done: true
          };
        };
        const nextY = y < max ? y + 1 : y;
        y = nextY;
        const done = nextY === max;
        return {
          value: [x, nextY],
          done
        };
      }
    };
  };

  const east = (coords) => {
    const max = 8;
    let [x, y] = coords;
    return {
      next: () => {
        if (x >= max) {
          return {
            value: null,
            done: true
          };
        };
        const nextX = x < max ? x + 1 : x;
        x = nextX;
        const done = nextX === max;
        return {
          value: [nextX, y],
          done
        };
      }
    };
  };

  const south = (coords) => {
    const max = 1;
    let [x, y] = coords;
    return {
      next: () => {
        if (y <= max) {
          return {
            value: null,
            done: true
          };
        };
        const nextY = y > max ? y - 1 : y;
        y = nextY;
        const done = nextY === max;
        return {
          value: [x, nextY],
          done
        };
      }
    };
  };

  const west = (coords) => {
    const max = 1;
    let [x, y] = coords;
    return {
      next: () => {
        if (x <= max) {
          return {
            value: null,
            done: true
          };
        };
        const nextX = x > max ? x - 1 : x;
        x = nextX;
        const done = nextX === max;
        return {
          value: [nextX, y],
          done
        };
      }
    };
  };
  const rotate = [
    // North
    (xy, coords) => {
      let [x, y] = xy;
      const iterable = move(y, 1);
      let result = iterable.next();
      do {
        console.log([x, result.value], check([x, result.value], coords));
        if (check([x, result.value], coords)) {
          return [x, result.value];
        }
        result = iterable.next();
      } while (!result.done);
      return [x, result.value];
    },
    (xy) => [move(x, 1), move(y, 1)],
    (xy) => [move(x, 1), y],
    (xy) => [move(x, 1), move(y, -1)],
    (xy) => [x, move(y, -1)],
    (xy) => [move(x, -1), move(y, -1)],
    (xy) => [move(x, -1), y],
    (xy) => [move(x, -1), move(y, 1)]
  ];
  const check = (needle, haystack) => {
    return haystack.indexOf(unParseArr(needle)) !== -1;
  };
  const main = (arr) => {
    let hitFound = false;
    const queens = parseArgs(arr);
    for(let queen of queens) {
      // inner loop here
      let hits = rotate[0](queen, arr);
      if (hits) {
        hitFound = hits;
        break;
      }
    }
    return hitFound;
  }
  return main(strArr);
}
