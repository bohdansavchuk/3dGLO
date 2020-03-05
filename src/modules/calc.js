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
            start = 0,
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

            const animTotal = () => {

                let value = Math.floor(total - start);

                if(value > 100000) {
                    start += 100000;
                } else if (value > 10000) {
                    start += 10000;
                } else if (value > 1000) {
                    start += 1000;
                } else if (value > 100) {
                    start += 100;
                } else if (value > 10) {
                    start += 10;
                } else if (value > 0) {
                    start += 1;
                } 

                totalValue.textContent = start;

                if(start !== total) {
                    requestAnimationFrame(animTotal);
                } else {
                    cancelAnimationFrame(animTotal);
                }
            };

            requestAnimationFrame(animTotal);   
        }

    };

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;

        if(target.matches('select') || target.matches('input')) {
            countSum();
        }

    });


};

export default calc;