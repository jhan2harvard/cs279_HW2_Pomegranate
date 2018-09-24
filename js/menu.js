function createMenu(submenus, ephemeral = true) {
  const menu = document.createElement('div');
  menu.classList.add('menu');

  const lists = [];
  let openList = null;

  const closeSubmenu = () => {
    if (openList) menu.removeChild(openList);
    openList = null;
  };

  const openSubmenu = (i) => {
    closeSubmenu();
    openList = lists[i];
    menu.appendChild(openList);
  };

  const tabs = document.createElement('ul');
  tabs.classList.add('tabs');

  submenus.forEach((submenu, i) => {
    const tab = document.createElement('li');
    tab.classList.add('tab');
    tab.textContent = submenu.title;
    tab.onclick = (e) => {
      openSubmenu(i);
      e.stopPropagation();
    };
    tabs.appendChild(tab);

    const list = document.createElement('ul');
    list.classList.add('items');
    submenu.items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.classList.add('item');
      if (ephemeral && item.predicted === false) {
        listItem.classList.add('fade-in');
      }
      listItem.textContent = item.name;
      list.appendChild(listItem);
    });
    lists.push(list);
  });

  menu.appendChild(tabs);

  window.onclick = closeSubmenu;

  return menu;
}
