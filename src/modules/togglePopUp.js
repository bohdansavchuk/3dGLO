'use strict';

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

export default togglePopUp;