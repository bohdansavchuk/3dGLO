'use strict';

const toggleMenu = () => {

    const menu = document.querySelector('menu'),
        burger = document.querySelector('.menu'),
        close = document.querySelector('.close-btn');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    window.addEventListener('click', (event) => { 
        let target = event.target;
        
        if (burger.contains(target) 
            || (target.tagName === 'A' && (target.closest('menu') || close.contains(target)))
            || (!menu.contains(target) && menu.classList.contains('active-menu'))
        ) {
              handlerMenu();
        } 
      });

};

export default toggleMenu;