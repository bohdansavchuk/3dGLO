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

   // slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dotsP = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval,
            dots = [];


        for(let i = 0; i < slide.length; i++){
            dots.length = i;
            let dot = document.createElement('li');
            dot.classList.add('dot');
            dotsP.appendChild(dot);
            dots.push(dot);
        }

        let dot = document.querySelectorAll('.dot');
            dot[0].classList.add('dot-active');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }  
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            
            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')) {
               return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            
            if(target.matches('#arrow-right')) {
                currentSlide++;
            } else if(target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if(elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if(currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(100000);


    };

   slider();

    const togglePhoto = () => {
        const comandPhoto = document.querySelectorAll('.command__photo');

        comandPhoto.forEach((item) => {
            let source;
            item.addEventListener('mouseover', (event) => {
                source = event.target.src;
                event.target.src = event.target.dataset.img;
            });
            item.addEventListener('mouseout', (event) => {
                event.target.src = source;
            });
        });
    };

    togglePhoto();

    const inputsNumber = () => {
        const calcItems = document.querySelectorAll('input.calc-item');

        calcItems.forEach((item) => {
            item.addEventListener('input', (event) => {
                item.value.replace(/\D/g, '');
            });
        });
    };

    inputsNumber();

});  