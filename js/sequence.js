/**
 * Generate a length-63 selection sequence.
 * @return {[number, number][63]} sequence
 * Items of sequence are [menuNum, itemNum]
 */
function getSequence() {
  const seq = [];
  let menus = [0, 1, 2];
  menus = shuffleArray(menus);
  for (let j = 0; j < 3; j += 1) {
    for (let k = 0; k < 21; k += 1) {
      const menusequence = [];
      const items = [];
      for (let i = 0; i < 8; i += 1) {
        items.push(randint(16));
      }
      [7, 4, 3, 2, 2, 1, 1, 1].forEach((freq, itemNum) => {
        for (let i = 0; i < freq; i += 1) {
          menusequence.push(items[itemNum]);
        }
      });
      seq.push([menus[j], menusequence[k]]);
    }
  }
  do {
    shuffleArray(seq);
  } while (pairs(seq).reduce((b, [i1, i2]) => b || (i1[0] === i2[0] && i1[1] === i2[1]), false))
  return shuffleArray(seq);
}

/**
 * Give every item in a sequence a different menu num
 */
function sameSequenceNewMenus(sequence) {
  return sequence.map(([menuNum, itemNum]) => {
    let newMenuNum;
    do {
      newMenuNum = randint(2);
    } while (newMenuNum === menuNum);
    return [newMenuNum, itemNum];
  });
}

/**
 * Populate sequences in localStorage
 * call generateSequences(true) in the console to force re-generation
 */
function generateSequences(reset = false) {
  const sequences = readLocalStorage('sequences', [getSequence(), getSequence()], reset);
  return sequences.map(sequence => sequence.map(item => item.map(s => parseInt(s, 10))));
}
