'use strict'; 

const sendForm = () => {
    const errorMessage = 'images/times.svg',
        loadMessage = 'images/yin-yang.svg',
        successMesage = 'images/check.svg';

    const form = document.querySelectorAll('form'),
        formPhone = document.querySelectorAll('.form-phone'),
        formName = document.querySelectorAll('[type="text"]'),
        formMess = document.querySelector('.mess');

    let spinInterval,
        count = 0;

    formPhone.forEach((item) => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^0-9+]/ig, '');
        });
    });

    formName.forEach((item) => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^\s/а-яА-Яa]/, '');
        });
    });

    formMess.addEventListener('input', () => {
        formMess.value = formMess.value.replace(/[^\s/?!,.а-яА-Яa]/, '');
    });

    const statusMessage = document.createElement('img');

    let spin = function() {
        spinInterval = requestAnimationFrame(spin);
        if(count < 500) {
            count++;
            statusMessage.style.transform = `rotate(${count*3}deg)`;
        }
    };

    form.forEach((item) => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();
            item.appendChild(statusMessage);
            statusMessage.src = loadMessage;
            spinInterval = requestAnimationFrame(spin);
            const formData = new FormData(item);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    cancelAnimationFrame(spinInterval);
                    statusMessage.style.transform = 'unset';
                    statusMessage.src = successMesage;
                    let inputs = item.querySelectorAll('input');
                    inputs.forEach((item) => {
                        item.value = '';
                    });
                })
                .catch((error) => {
                    cancelAnimationFrame(spinInterval);
                    statusMessage.style.transform = 'unset';
                    statusMessage.src = errorMessage;
                    console.error(error);
                });
        });
    });

    const postData = (body) => {

        return fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };
};

export default sendForm;