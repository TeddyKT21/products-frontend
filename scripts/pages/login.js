import { login } from "../util/data.js";
import { appendInputs, appendNewElement, createNewElement } from "../util/elementCreation.js";

const main = document.getElementById('main');


export function loadLogin(router) {
    const loginPage = createNewElement('div', { class: 'userPage' });
    const header = appendNewElement('h1', loginPage, { innerText: 'Login' });
    const inputsContainer = appendNewElement('div',loginPage,{class:'inputsContainer'});
    const inputs = appendInputs(['email', 'password'],
    inputsContainer,
        ['text', 'password'],
        [{ class: 'userPageInput' }, { class: 'userPageInput' }])
    const loginButton = appendNewElement('button', inputsContainer, { class: 'submitButton',innerText: 'login' });
    loginButton.addEventListener('click', async() => {
        const data = {};
        inputs.forEach(input => data[input.name] = input.value);
        await login(data);
        router.productsPage(main);
    });

    return loginPage;
}