class Menu {
  constructor(submenus) {
    this.elm = document.createElement('div');
    this.elm.classList.add('menu');

    this.lists = [];
    let openList = null;

    const closeSubmenu = () => {
      if (openList) this.elm.removeChild(openList);
      openList = null;
    };

    const openSubmenu = (i) => {
      closeSubmenu();
      openList = this.lists[i];
      this.elm.appendChild(openList);
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
        this.elm.dispatchEvent(new CustomEvent('clickMenu', { menuNum: i }));
      };
      tabs.appendChild(tab);

      const list = document.createElement('ul');
      list.classList.add('items');
      submenu.items.forEach((item, j) => {
        const listItem = document.createElement('li');
        listItem.classList.add('item');
        listItem.textContent = item.name;
        listItem.addEventListener('click', () => {
          this.elm.dispatchEvent(new CustomEvent('clickItem', { menuNum: i, itemNum: j }));
        });
        list.appendChild(listItem);
      });
      this.lists.push(list);
    });

    this.elm.appendChild(tabs);

    window.addEventListener('click', closeSubmenu);
  }

  setNonePredicted() {
    this.lists.forEach((ul) => {
      ul.children.forEach((li) => {
        li.classList.add('fade-in');
      });
    });
  }

  setPredicted(predicted) {
    this.setNonePredicted();
    predicted.forEach(([menuNum, itemNum]) => {
      this.lists[menuNum].children[itemNum].classList.remove('fade-in');
    });
  }

  getWord(menuNum, itemNum) {
    return this.lists[menuNum].children[itemNum].innerText;
  }
}
