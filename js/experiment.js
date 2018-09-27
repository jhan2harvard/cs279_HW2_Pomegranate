async function runBlock(sequence, ephemeral, blockNum, predictions) {
  let trialNum = -1;
  let targetMenuNum;
  let targetItemNum;
  let targetWord;
  let numMistakes;
  let startTime;

  const nextTrial = () => {
    trialNum += 16;
    if (trialNum >= sequence.length) {
      if (trialNum === sequence.length) {
        window.dispatchEvent(new CustomEvent('blockDone', { detail: { ephemeral, blockNum } }));
      }
      return;
    }
    [targetMenuNum, targetItemNum] = sequence[trialNum];
    targetWord = menu.getWord(targetMenuNum, targetItemNum);
    showTarget(targetMenuNum + 1, targetWord);
    console.log(predictions);
    if (predictions) menu.setPredicted(predictions[trialNum]);
    numMistakes = 0;
  };

  nextTrial();

  window.addEventListener('clickMenu', () => {
    if (trialNum >= sequence.length) return;
    startTime = (new Date()).getTime();
  });

  window.addEventListener('clickItem', ({ detail: { menuNum: clickedMenuNum, itemNum: clickedItemNum } }) => {
    if (trialNum >= sequence.length) return;
    if (clickedMenuNum === targetMenuNum && clickedItemNum === targetItemNum) {
      const endTime = (new Date()).getTime();
      window.dispatchEvent(new CustomEvent('trialDone', {
        detail: {
          condition: ephemeral ? 'ephemeral' : 'control',
          block: blockNum,
          trial: trialNum + 1,
          elapsed: endTime - startTime,
          mistakes: numMistakes,
          word: targetWord,
          menu: targetMenuNum,
          item: targetItemNum,
        },
      }));
      nextTrial();
    } else {
      numMistakes += 1;
    }
  });
}

function runExperiment() {
  const sequence1 = getSequence();
  const sequence2 = getSequence();
  runBlock(sequence1, false, 1);
  window.addEventListener('blockDone', ({ detail: { ephemeral, blockNum } }) => {
    if (ephemeral && blockNum === 2) {
      window.dispatchEvent(new CustomEvent('experimentDone'));
      return;
    }
    let sequence = blockNum === 1 ? sequence2 : sequence1;
    const nextEphemeral = ephemeral || blockNum === 2;
    let predictions;
    if (nextEphemeral) {
      sequence = sameSequenceNewMenus(sequence);
      predictions = getPredictions(sequence);
    }
    runBlock(sequence, nextEphemeral, blockNum === 1 ? 2 : 1, predictions);
  });
}
