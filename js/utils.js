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
