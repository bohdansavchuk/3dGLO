window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //таймер
    
    let date;
    date = new Date();
    date.setDate(date.getDate() +1);
    date.setHours(0, 0, 0); 

    function countTimer() {

        let timerHours = document.getElementById('timer-hours'),
            timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds');

        function getTimeRemaining(){
            let dateStop = date.getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor((timeRemaining % 60)),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                return {timeRemaining, seconds, minutes, hours};
        }

        function updateClock() {
            let timer = getTimeRemaining();
            
            timerHours.textContent = ("0" + timer.hours).slice(-2);
            timerMinutes.textContent = ("0" + timer.minutes).slice(-2);
            timerSeconds.textContent = ("0" + timer.seconds).slice(-2);

            if(timer.timeRemaining < 1){

                date.setDate(date.getDate() +1);
            } 
        } 

        updateClock();

        setInterval(updateClock, 1000);

    } 

    countTimer();

    //меню

    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);   

        closeBtn.addEventListener('click', handlerMenu); 

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    // popup

    const togglePopUp = () => { 
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');

        let count = 0,
        animate;

        let popupAnimate = () => {
            animate = requestAnimationFrame(popupAnimate);
            if(count < 25) {
                count++;
                popupContent.style.top = count * 4 + "px";
            }else {
                cancelAnimationFrame(animate);
            }
        };

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () =>{
                popup.style.display = 'block';
                if(document.body.clientWidth > 768) {
                    animate = requestAnimationFrame(popupAnimate);
                } else {
                    cancelAnimationFrame(animate);
                }
            });
            
        });

        popupClose.addEventListener('click', () => {
            cancelAnimationFrame(animate);
            popupContent.style.top = 10 + '%';
            popup.style.display = 'none';
            count = 0;
        });
        
    };

    togglePopUp();


    // scroll

    const menuLinks = document.querySelectorAll('menu > ul > li > a'),
            mainBtn = document.querySelector('[href="#service-block"]');        

    const scroll = (elem) => {
        elem.addEventListener('click', function (event) {
            event.preventDefault();
            
            const blockID = elem.getAttribute('href');

            document.querySelector(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };

    menuLinks.forEach((item) => {
        scroll(item);
    });

    scroll(mainBtn);

});  