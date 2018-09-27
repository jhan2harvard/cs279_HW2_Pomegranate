const LO_ACC = Math.round(0.5 * 63);
const HI_ACC = Math.round(0.79 * 63);

function getPredictions(sequence, acc = LO_ACC) {
  const bools = new Array(63).fill(false);
  for (let j = 0; j < acc; j += 1) bools[j] = true;
  shuffleArray(bools);

  return sequence.map(([menuNum, itemNum], t) => {
    const predictions = [];
    for (let m = 0; m < 3; m += 1) {
      const predictedItems = new Set();
      const forcePredict = bools[t] && menuNum === m;
      if (!forcePredict) predictedItems.add(itemNum);
      for (let i = 0; i < (forcePredict ? 2 : 3); i += 1) {
        let predictItem;
        do {
          predictItem = randint(16);
        } while (predictedItems.has(predictItem));
        predictedItems.add(predictItem);
        predictions.push([m, predictItem]);
      }
      if (forcePredict) predictions.push([m, itemNum]);
    }
    return predictions;
  });
}
