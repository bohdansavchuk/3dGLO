'use strict';

import getTimer from './modules/timer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import getScroll from './modules/getScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import togglePhoto from './modules/togglePhoto';
import inputsNumber from './modules/inputsNumber';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// timer   
getTimer();
// menu
toggleMenu();
// popup
togglePopUp();
// scroll
getScroll();
// tabs
tabs();
// slider
slider();
// togglePhoto
togglePhoto();
// inputsNumber
inputsNumber();
// calc
calc(100);
// send-ajax-form
sendForm();