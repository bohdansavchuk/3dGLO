window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    function countTimer(deadline) {
        let timerHours = document.getElementById('timer-hours'),
            timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds');

        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(),
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

            if(timer.timeRemaining < 0){
                timerHours.textContent = "00";
                timerMinutes.textContent = "00";
                timerSeconds.textContent = "00";
            } 

            // if(timer.timeRemaining > 0){
            //     setTimeout(updateClock, 1000);
            // } else {
            //     timerHours.textContent = "00";
            //     timerMinutes.textContent = "00";
            //     timerSeconds.textContent = "00";
            // }

        } 

        updateClock();

        setInterval(updateClock, 1000);

    }

    countTimer('19 february 2020');

});  