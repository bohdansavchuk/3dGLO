'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

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