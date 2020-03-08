'use strict';

const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    
    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if(calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if(calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if(typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue; 
        }

        // функция - оболочка анимации
        const animateCalc = ({linear, draw, duration}) => {
            let aniInterval;
            let start = performance.now();

            const animateBlock = (time) => {
                aniInterval = requestAnimationFrame(animateBlock);
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) {timeFraction = 1;}

                // вычисление текущего состояния анимации
                let progress = linear(timeFraction);

                draw(progress); // отрисовать её
                if (timeFraction >= 1){
                    cancelAnimationFrame(aniInterval);
                }
            };
            requestAnimationFrame(animateBlock);
        };

        animateCalc({
            // скорость анимации
            duration: 1000,
            // функция расчёта времени
            linear(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                totalValue.textContent = Math.floor(progress * total);
            }
        });

    };

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;

        if(target.matches('select') || target.matches('input')) {
            countSum();
        }

    });

    calcSquare.addEventListener('change', (event) => {
        const target = event.target;

        if(target.value === '') {
            totalValue.textContent = 0;
        }
    });

};

export default calc;