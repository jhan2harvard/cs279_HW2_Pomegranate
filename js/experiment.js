async function runBlock(sequence, ephemeral, blockNum) {
  let trialNum = -1;
  let targetMenuNum;
  let targetItemNum;
  let targetWord;
  let numMistakes;
  let startTime;

  const nextTrial = () => {
    trialNum += 8;
    if (trialNum >= sequence.length) {
      if (trialNum === sequence.length) {
        window.dispatchEvent(new CustomEvent('blockDone', { detail: { ephemeral, blockNum } }));
      }
      return;
    }
    [targetMenuNum, targetItemNum] = sequence[trialNum];
    targetWord = menu.getWord(targetMenuNum, targetItemNum);
    showTarget(targetMenuNum + 1, targetWord);
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
  let sequence = getSequence();
  runBlock(sequence, false, 1);
  window.addEventListener('blockDone', ({ detail: { ephemeral, blockNum } }) => {
    sequence = sameSequenceNewMenus(sequence);
    if (blockNum === 1) {
      runBlock(sequence, ephemeral, 2);
    } else if (ephemeral === false) {
      runBlock(sequence, true, 1);
    } else {
      window.dispatchEvent(new CustomEvent('experimentDone'));
    }
  });
}
