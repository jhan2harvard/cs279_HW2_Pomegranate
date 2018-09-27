function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

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
  return shuffleArray(seq);
}

function sameSequenceNewMenus(sequence) {
  return sequence.map(([menuNum, itemNum]) => {
    let newMenuNum;
    do {
      newMenuNum = randint(2);
    } while (newMenuNum === menuNum);
    return [newMenuNum, itemNum];
  });
}
