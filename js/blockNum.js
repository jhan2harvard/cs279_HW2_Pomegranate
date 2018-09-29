// keep track of how many blocks the subject has done on each condition

function getBlockNums(reset = false) {
  const blockNums = readLocalStorage('blockNums', { ephemeral: 0, control: 0 }, reset);
  Object.keys(blockNums).forEach((condition) => {
    blockNums[condition] = parseInt(blockNums[condition], 10);
  });
  return blockNums;
}

function incrementBlockNum(ephemeral) {
  const blockNums = getBlockNums();
  blockNums[ephemeral ? 'ephemeral' : 'control'] += 1;
  localStorage.blockNums = JSON.stringify(blockNums);
}
