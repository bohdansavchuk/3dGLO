'use strict';

const inputsNumber = () => {
    const calcItems = document.querySelectorAll('input.calc-item');

    calcItems.forEach((item) => {
        item.addEventListener('input', (event) => {
            item.value = item.value.replace(/[^0-9]+/g, '');
        });
    });
};

export default inputsNumber;