// contains general-use functions

function randint(upperOpenBound) {
  return Math.floor(Math.random() * upperOpenBound);
}

function findFirstString(str, choices) {
  for (let j = 0; j < choices.length; j += 1) {
    if (str.indexOf(choices[j]) >= 0) {
      return choices[j];
    }
  }
  return '?';
}

/**
 * Randomize order of elements in an array.
 * This mutates the array.
 */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

/**
 * Get array of adjacent pairs in array
 */
function pairs(arr) {
  const p = [];
  for (let i = 0; i < arr.length - 1; i += 1) {
    p.push([arr[i], arr[i + 1]]);
  }
  return p;
}

/**
 * Get JSON parsed local storage
 * @param {string} key 
 * @param {object} def - default
 * @param {boolean} reset - set value to default
 */
function readLocalStorage(key, def = undefined, reset = false) {
  let val;
  if (reset || !localStorage[key]) {
    val = def;
    localStorage[key] = JSON.stringify(val);
  } else {
    val = JSON.parse(localStorage[key]);
  }
  return val;
}
