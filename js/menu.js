// this file (with menu.css) implements the ephemeral menu

class Menu {
  /**
   * Insert the menu in the DOM
   * Sends events when tabs and items are clicked
   * @param {Submenu[]} submenus
   */
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
        window.dispatchEvent(new CustomEvent('clickMenu', { detail: { menuNum: i } }));
      };
      tabs.appendChild(tab);

      const list = document.createElement('ul');
      list.classList.add('items');
      submenu.items.forEach((item, j) => {
        const listItem = document.createElement('li');
        listItem.classList.add('item');
        listItem.textContent = item;
        listItem.addEventListener('click', () => {
          window.dispatchEvent(new CustomEvent('clickItem', { detail: { menuNum: i, itemNum: j } }));
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
      Array.from(ul.children).forEach((li) => {
        li.classList.add('fade-in');
      });
    });
  }

  setAllPredicted() {
    this.lists.forEach((ul) => {
      Array.from(ul.children).forEach((li) => {
        li.classList.remove('fade-in');
      });
    });
  }

  setPredicted(predicted) {
    this.setNonePredicted();
    predicted.forEach(([menuNum, itemNum]) => {
      Array.from(this.lists[menuNum].children)[itemNum].classList.remove('fade-in');
    });
  }

  getWord(menuNum, itemNum) {
    return this.lists[menuNum].children[itemNum].innerText;
  }
}
