import { ROUTER } from "./scripts/util/routing.js";

const main = document.getElementById('main');


const homeButton = document.getElementsByClassName('goHome')[0];
const addButton = document.getElementsByClassName('addProduct')[0];

homeButton.addEventListener('click', () => ROUTER.goHome(main));
addButton.addEventListener('click', () => ROUTER.editPage(main,null));

const loginButton = document.getElementById('login');
loginButton.addEventListener('click', () => ROUTER.login(main));

const signUpButton = document.getElementById('signup');
signUpButton.addEventListener('click', () => ROUTER.signUp(main));

async function start() {
   await ROUTER.productsPage(main);
}
start();