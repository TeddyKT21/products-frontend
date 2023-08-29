import { ROUTER } from "./scripts/util/routing.js";


const homeButton = document.getElementsByClassName('goHome')[0];
const addButton = document.getElementsByClassName('addProduct')[0];

homeButton.addEventListener('click', () => ROUTER.goHome());
addButton.addEventListener('click', () => ROUTER.editPage(null));

const loginButton = document.getElementById('login');
loginButton.addEventListener('click', () => ROUTER.login());

const signUpButton = document.getElementById('signup');
signUpButton.addEventListener('click', () => ROUTER.signUp());

async function start() {
   await ROUTER.productsPage();
}
start();