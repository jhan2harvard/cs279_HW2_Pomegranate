// Genrates or remembers a somewhat-unique ID with distilled user-agent info.
function getUniqueId() {
  if (!('uid' in localStorage)) {
    const browser = findFirstString(navigator.userAgent, [
      'Seamonkey', 'Firefox', 'Chromium', 'Chrome', 'Safari', 'OPR', 'Opera',
      'Edge', 'MSIE', 'Blink', 'Webkit', 'Gecko', 'Trident', 'Mozilla']);
    const os = findFirstString(navigator.userAgent, [
      'Android', 'iOS', 'Symbian', 'Blackberry', 'Windows Phone', 'Windows',
      'OS X', 'Linux', 'iOS', 'CrOS']).replace(/ /g, '_');
    const unique = (`${Math.random()}`).substr(2);
    localStorage.uid = `${os}-${browser}-${unique}`;
  }
  return localStorage.uid;
}

function enableLogging() {
  const uid = getUniqueId();
  window.addEventListener('trialDone', ({ detail }) => {
    const {
      accuracy,
      ephemeral,
      block,
      trial,
      elapsed,
      mistakes,
      word,
      menu,
      item,
    } = detail;
    sendLogs(uid, accuracy, ephemeral, block, trial, elapsed, mistakes, word, menu, item);
  });
}
