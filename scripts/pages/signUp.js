import { signUp } from "../util/data.js";
import { appendInputs, appendNewElement, createNewElement } from "../util/elementCreation.js";
const main = document.getElementById('main');

export function loadSignUp(router) {
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
        router.productsPage(main);
    });
    return signUpPage;
}