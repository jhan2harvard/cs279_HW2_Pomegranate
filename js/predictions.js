// unfortunately with 63 trials per block instead of 126, these don't work out exact
const LO_ACC = Math.round(0.5 * 63);
const HI_ACC = Math.round(0.79 * 63);

// accuracy is determined randomly by default
// for in-person testing, set localStorage.accuracy to HI_ACC or LO_ACC in the console
if (!localStorage.accuracy) localStorage.accuracy = randint(2) === 0 ? HI_ACC : LO_ACC;
accuracy = parseInt(localStorage.accuracy, 10);

/**
 * Given a sequence, get "predictions"
 * @param {[number, number][]} sequence
 * @param {number} acc - number of trials with correct prediction
 * @return {[number, number][9][]}
 * nine items ([menuNum, columnNum]) to predict for each item in the sequence
 */
function getPredictions(sequence, acc = accuracy) {
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
