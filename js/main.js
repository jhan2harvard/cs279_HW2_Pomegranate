const submenus = getSubmenuWords();
const menu = createMenu(submenus);

window.onload = () => {
  document.getElementById('experiment').appendChild(menu);
};
