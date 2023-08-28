import { login, signUp } from "./data.js";
import { appendInput, appendInputs, appendNewElement, createNewElement } from "./elementCreation.js";
import { goToPage } from "./history.js";
const main = document.getElementById('main');


function loadLogin() {
    const loginPage = createNewElement('div', { class: 'userPage' });
    const header = appendNewElement('h1', loginPage, { innerText: 'Login' });
    const inputsContainer = appendNewElement('div',loginPage,{class:'inputsContainer'});
    const inputs = appendInputs(['email', 'password'],
    inputsContainer,
        ['text', 'password'],
        [{ class: 'userPageInput' }, { class: 'userPageInput' }])
    const loginButton = appendNewElement('button', inputsContainer, { class: 'submitButton',innerText: 'login' });
    loginButton.addEventListener('click', () => {
        const data = {}
        inputs.forEach(input => data[input.name] = input.value);
        login(data);
    });

    return loginPage;
}
function loadSignUp() {
    const signUpPage = createNewElement('div', { class: 'userPage' });
    const header = appendNewElement('h1', signUpPage, { innerText: 'Sign Up' });
    const inputsContainer = appendNewElement('div',signUpPage,{class:'inputsContainer'});
    const inputs = appendInputs(['email', 'password', 'confirm password', 'admin'],
    inputsContainer,
        ['text', 'password', 'password', 'checkbox'],
        [{ class: 'userPageInput' }, { class: 'userPageInput' }, { class: 'userPageInput' }, {}])
    const signUpButton = appendNewElement('button', signUpPage, { class: 'submitButton',innerText: 'sign up' });
    signUpButton.addEventListener('click', () => {
        const data = {};
        inputs.forEach(input => data[input.name] = input.type !== 'checkbox' ? input.value : input.checked);
        signUp(data);
    });

    return signUpPage;
}






const loginButton = document.getElementById('login');
const signUpButton = document.getElementById('signup');
loginButton.addEventListener('click', () => goToPage(main, loadLogin()));
signUpButton.addEventListener('click', () => goToPage(main, loadSignUp()));