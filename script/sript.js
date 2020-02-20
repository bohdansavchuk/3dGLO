window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    // timer
    
    const getTimer = () => {
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
    };

    getTimer();

    // menu

    const toggleMenu = () => {

        const menu = document.querySelector('menu'),
            mainHeader = document.querySelector('.main-header');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        mainHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.menu');
    
            if(target) {
                handlerMenu();
            }
        });   

        menu.addEventListener('click', (event) => {
           let target = event.target;

           if(target.tagName === 'A') {
                handlerMenu();
           } 

        });

    };

    toggleMenu();

    // popup

    const togglePopUp = () => { 
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
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

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('popup-close')) {
                cancelAnimationFrame(animate);
                popupContent.style.top = 10 + '%';
                popup.style.display = 'none';
                count = 0;
            } else {
                target = target.closest('.popup-content');

                if(!target) {
                    cancelAnimationFrame(animate);
                    popupContent.style.top = 10 + '%';
                    popup.style.display = "none";
                    count = 0;
                }
            }
            
        });
        
    };

    togglePopUp();


    // scroll

   const getScroll =() => {

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

   };

   getScroll();

   // tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

            const toggleTabContent = (index) => {
                for (let i = 0; i < tabContent.length; i++) {
                    if(index === i) {
                        tab[i].classList.add('active');
                        tabContent[i].classList.remove('d-none');
                    } else {
                        tab[i].classList.remove('active');
                        tabContent[i].classList.add('d-none');
                    }
                }
            };

            tabHeader.addEventListener('click', (event) => {
                let target = event.target;
                    target = target.closest('.service-header-tab');

                if(target) {
                    tab.forEach((item, i) => {
                        if(item === target) {
                            toggleTabContent(i);
                        }
                    });
                }
            });
    };

   tabs();

});  