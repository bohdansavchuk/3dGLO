window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    let date;

    function setDate() {
        date = new Date();

        date.setDate(date.getDate() +1);
        date.setHours(0, 0, 0);    
    }

    function countTimer() {
        setDate();

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

            if(timer.timeRemaining < 0){

                timerHours.textContent = "00";
                timerMinutes.textContent = "00";
                timerSeconds.textContent = "00";

                setDate();
            } 

        } 

        updateClock();

        setInterval(updateClock, 1000);

    } 

    countTimer();
});  