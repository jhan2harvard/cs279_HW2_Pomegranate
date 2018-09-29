// this code creates and runs the actual experiment

const queryParams = new URLSearchParams(window.location.search);

let menu;

function alertAndGoHome(message) {
  alert(`${message}\nGoing back to the homepage.`);
  window.location.href = 'index.html';
}

function blockStart(sequence, ephemeral, blockNum) {
  const predictions = ephemeral ? getPredictions(sequence) : null;
  if (!ephemeral) menu.setAllPredicted(); // no fade-in

  let trialNum = parseInt(queryParams.get('trial'), 10) || -1;
  let targetMenuNum;
  let targetItemNum;
  let targetWord;
  let numMistakes;
  let startTime;

  const nextTrial = () => {
    trialNum += 1;
    queryParams.set('trial', trialNum);
    history.pushState(null, '', window.location.pathname + '?' + queryParams.toString());

    if (trialNum === sequence.length) window.dispatchEvent(new CustomEvent('blockDone'));
    if (trialNum >= sequence.length) return;

    [targetMenuNum, targetItemNum] = sequence[trialNum];
    targetWord = menu.getWord(targetMenuNum, targetItemNum);
    showTarget(targetMenuNum + 1, targetWord);
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
          accuracy: accuracy == HI_ACC ? 'high' : 'low',
          ephemeral,
          block: blockNum,
          trial: trialNum,
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

function loadExperiment() {
  const sequences = generateSequences();
  const blockNums = getBlockNums();
  const ephemeral = queryParams.get('ephemeral') == 'true';

  const blockNum = blockNums[ephemeral ? 'ephemeral' : 'control'];
  const otherBlockNum = blockNums[ephemeral ? 'control' : 'ephemeral'];

  menu = new Menu(getSubmenuWords());
  document.getElementById('experiment').appendChild(menu.elm);

  enableLogging();

  if (blockNum >= sequences.length) {
    alertAndGoHome('You have completed this condition the maximum number of times.');
  } else if (otherBlockNum === 1) {
    alertAndGoHome('Please do another set of the other condition first.');
  } else {
    const sequence = sequences[blockNum];
    blockStart(sequence, ephemeral, blockNum);
  }

  window.addEventListener('blockDone', () => {
    incrementBlockNum(ephemeral);
    alertAndGoHome('You have finished the block.');
  });
};

window.addEventListener('load', loadExperiment);
