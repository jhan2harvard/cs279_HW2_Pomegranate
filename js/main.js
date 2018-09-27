const submenus = getSubmenuWords();
const menu = new Menu(submenus);

window.onload = () => {
  document.getElementById('experiment').appendChild(menu.elm);
  enableLogging();
  runExperiment();
};
