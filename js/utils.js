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

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}
