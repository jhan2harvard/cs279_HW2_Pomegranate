function getSubmenuWords() {
  const submenus = [];
  for (let i = 0; i < 3; i += 1) {
    const submenu = {
      title: `Menu ${i}`,
      items: [],
    };
    const r = Math.floor(Math.random() * 16);
    for (let j = 0; j < 16; j += 1) {
      const item = {
        name: `Item ${i}-${j}`,
      };
      item.predicted = (r + j) % 5 === 0;
      submenu.items.push(item);
    }
    submenus.push(submenu);
  }
  return submenus;
}
