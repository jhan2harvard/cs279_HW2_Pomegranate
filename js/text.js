// contains dynamic text operations

// show the menu and item that the user should hit
function showTarget(menu, word) {
  document.getElementById('menu-num').innerHTML = menu;
  document.getElementById('word').innerHTML = word;
}

// display the trial count progress to the user
function showTrialProgress(trialCount, total) {
  document.getElementById('trial-num').innerHTML = trialCount;
  document.getElementById('total-trials').innerHTML = total;
}

function showBlockProgress(blockCount, total) {
  document.getElementById('block-num').innerHTML = blockCount;
  document.getElementById('total-blocks').innerHTML = total;
}
