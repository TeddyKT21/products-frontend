import { appendNewElement, createNewElement, appendIconButton } from "../util/elementCreation.js"


const main = document.getElementById('main');


function appendDetails(detailsPage, product) {
    const detailsDisplay = appendNewElement('div', detailsPage, { class: 'detailsDisplay' });
    detailsDisplay.innerHTML = '';
    const imageDisplay = appendNewElement('div', detailsDisplay, { class: 'imageHolderLarge' });
    const image = appendNewElement('img', imageDisplay, { class: 'imageLarge', src: product.image });
    const infoDiv = appendNewElement('div', detailsDisplay, { class: 'infoDiv' });
    const productFields = ['title', 'description', 'category', 'price', 'quantity'];
    productFields.forEach(field => {
        const header = appendNewElement('h2', infoDiv, { innerText: field.charAt(0).toLocaleUpperCase() + field.slice(1) });
        const info = appendNewElement('p', infoDiv, { innerText: product[field] });
    });
}

function appendNavDetails(detailsPage, product,router) {
    const navigateOptions = appendNewElement('div', detailsPage, { class: 'navigateOptions' });
    appendIconButton(navigateOptions, 'arrow_back', {}, () => router.goBack(main));
    appendIconButton(navigateOptions, 'edit', {}, () => router.editPage(main,product));
    appendIconButton(navigateOptions, 'home', {}, () => router.goHome(main));
}

export function loadDetailsPage(product = {},router) {
    const detailsPage = createNewElement('div', { class: 'detailsPage' });
    appendNavDetails(detailsPage, product,router);
    const header = appendNewElement('h1', detailsPage, { fonstSize: 'xx-large', innerText: 'Details' });
    appendDetails(detailsPage, product);
    return detailsPage;
}