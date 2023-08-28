import { appendNewElement, createNewElement, appendIconButton, appendInput, appendInputs } from "./scripts/elementCreation.js"
import { addProduct, categories, getData, removeProduct, updateProduct } from "./scripts/data.js";
import { goBack, goHome, goToPage } from "./scripts/history.js";

const main = document.getElementById('main');




//                                    edit page code


function fillInputs(product, inputs, categorySelect) {
    if (product) {
        inputs.forEach(input => input.value = product[input.name]);
        categorySelect.value = product.category;
    }
    else {
        inputs.forEach(input => input.value = '');
        categorySelect.value = "";
    }
}

function appendNavEdit(editPage, product) {
    const navigateOptions = appendNewElement('div', editPage, { class: 'navigateOptions' });
    appendIconButton(navigateOptions, 'arrow_back', {}, () => goBack(main));
    if (product) appendIconButton(navigateOptions, 'pageview', {}, () => goToPage(main, loadDetailsPage(product)));
    appendIconButton(navigateOptions, 'home', {}, () => goHome(main));
}

function loadEditPage(product = null) {
    const editPage = createNewElement('div', { class: 'editPage' });
    appendNavEdit(editPage, product);
    const header = appendNewElement('h1', editPage, { fonstSize: 'xx-large', innerText: product ? 'Edit Product' : 'Add New Product' });
    const editForm = appendNewElement('form', editPage, { class: 'editSection' })
    const inputNames = ['title', 'price', 'description', 'image', 'quantity'];
    const inputTypes = ['text', 'number', 'text', 'text', 'number'];
    const inputAttributes = [{ requiered: true, minlength: 3, maxlength: 20 },
    { required: true, min: 0, step: '0.01' },
    { requiered: true, minlength: 5, maxlength: 100 },
    { requiered: true }, {}];
    const inputs = appendInputs(inputNames, editForm, inputTypes, inputAttributes);
    const categorySelect = appendNewElement('select', editForm, { class: 'categorySelect', required: true });
    categories.forEach(c => {
        appendNewElement('option', categorySelect, { value: c, innerText: c });
    })
    fillInputs(product, inputs, categorySelect);
    const sendButton = appendNewElement('input', editForm, { class: 'submitButton', type: 'submit', value: product ? 'EDIT' : 'ADD' });
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!editForm.checkValidity()) return;
        const updatedProduct = product ? product : {};
        inputs.forEach(input => updatedProduct[input.name] = input.value);
        updatedProduct.category = categorySelect.value;
        product ? updateProduct(updatedProduct) : addProduct(updatedProduct);
        alert('Changes saved !')
        goToPage(main, loadProductsPage(await getData()));
    })
    return editPage;

}





//                                             details page code 



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

function appendNavDetails(detailsPage, product) {
    const navigateOptions = appendNewElement('div', detailsPage, { class: 'navigateOptions' });
    appendIconButton(navigateOptions, 'arrow_back', {}, () => goBack(main));
    appendIconButton(navigateOptions, 'edit', {}, () => goToPage(main, loadEditPage(product)));
    appendIconButton(navigateOptions, 'home', {}, () => goHome(main));
}

function loadDetailsPage(product = {}) {
    const detailsPage = createNewElement('div', { class: 'detailsPage' });
    appendNavDetails(detailsPage, product);
    const header = appendNewElement('h1', detailsPage, { fonstSize: 'xx-large', innerText: 'Details' });
    appendDetails(detailsPage, product);
    return detailsPage;
}










//                                             products page code

function appendCard(container, product) {
    const card = appendNewElement('div', container, { class: 'card', product });
    card.addEventListener('click', () => {
        goToPage(main, loadDetailsPage(product));
    });
    const imageHolder = appendNewElement('div', card, { class: 'imageholder' });
    const image = appendNewElement('img', imageHolder, { class: 'imageCardDisplay', src: product.image });
    const title = appendNewElement('h3', card, { innerText: product.title });
    return card;
}

function appendQuantityDiv(card, product) {
    const displayQuantityDiv = createNewElement('div', { class: 'quantityDisplay', innerText: `${product.quantity}` });
    const quantityDiv = appendNewElement('div', card, { class: 'quantityDiv' });
    appendIconButton(quantityDiv, 'add', {}, (e) => {
        e.stopPropagation();
        updateProduct({ ...product, quantity: product.quantity + 1 });
        card.product.quantity = product.quantity + 1;
        let num = Number(displayQuantityDiv.innerText);
        displayQuantityDiv.innerText = num + 1;
    });
    quantityDiv.appendChild(displayQuantityDiv);
    appendIconButton(quantityDiv, 'remove', {}, (e) => {
        e.stopPropagation();
        if (card.product.quantity <= 0) return;
        card.product.quantity = product.quantity - 1;
        updateProduct({ ...product, quantity: product.quantity - 1 });
        let num = Number(displayQuantityDiv.innerText);
        displayQuantityDiv.innerText = num - 1;
    });
}

function loadCardBottom(card, product) {
    const bottomDiv = appendNewElement('div', card, { class: 'cardBottom' })
    const naviationOptions = appendNewElement('div', bottomDiv, { class: 'cardNav' });
    appendIconButton(naviationOptions, 'delete', {}, (e) => {
        e.stopPropagation();
        removeProduct(product.id);
        card.remove();
    });
    appendIconButton(naviationOptions, 'edit', {}, (e) => {
        e.stopPropagation();
        goToPage(main, loadEditPage(product));
    });
    const star = appendNewElement('i', bottomDiv, { innerText: 'star', class: 'material-symbols-outlined' })
    star.classList.add(product.rating?.rate > 4.5 ? 'fullStar' : 'emptyStar')
}

function loadCards(products, anchor) {
    const container = appendNewElement('div', anchor, { class: 'container' });
    products.forEach(product => {
        const card = appendCard(container, product);
        appendQuantityDiv(card, product);
        loadCardBottom(card, product);
    });
}
function updateVisibility(card, keys, keyWords, category) {
    card.style.display = 'flex';
    const product = card.product;
    const valuesStrings = keys.filter(key => key !== 'id' && key != 'image')
        .map(key => product[key]
            .toString()
            .toLocaleLowerCase());
    let found = false;
    valuesStrings.forEach(value => {
        if (keyWords.some(word => value.includes(word))) found = true;
    });
    if (!found) {
        card.style.display = 'none';
    }
    if (category && card.product.category !== category) card.style.display = "none";
}

function filterCards(filters, cards) {
    const keyWords = filters.keyWords;
    const category = filters.category;
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const keys = Object.keys(card.product);
        updateVisibility(card, keys, keyWords, category);
    }
}

function handleCategorySelect(categoryFilter, filters) {
    const cards = document.getElementsByClassName('card');
    const categoryFilters = document.getElementsByClassName('categoryFilter');
    for (let i = 0; i < categoryFilters.length; i++) categoryFilters[i].classList.remove('selected');
    categoryFilter.classList.add('selected');
    filters.category = categoryFilter.category;
    filterCards(filters, cards);
}

function loadSearchInput(searchBar, filters) {
    const searchInputs = appendNewElement('div', searchBar, { class: 'searchDiv' });
    const searchInput = appendNewElement('input', searchInputs, { class: 'searchInput', type: 'text', placeholder: 'search' });
    const searchButton = appendNewElement('button', searchInputs, { class: 'searchButton' });
    searchButton.addEventListener('click', () => {
        const cards = document.getElementsByClassName('card');
        filters.keyWords = searchInput.value.toLocaleLowerCase().trim().split(' ');
        filterCards(filters, cards);
    });
    const icon = appendNewElement('i', searchButton, { class: 'material-symbols-outlined', innerText: 'search' });
    icon.classList.add('noHover');
}

function loadCategories(searchBar, filters) {
    const categoryDiv = appendNewElement('div', searchBar, { class: 'categoryDiv' });
    categories.forEach(category => {
        const firstWord = category.split("'")[0];
        const innerText = firstWord.charAt(0).toLocaleUpperCase() + firstWord.slice(1);
        const categoryFilter = appendNewElement('div', categoryDiv, { class: 'categoryFilter', innerText, category });
        categoryFilter.addEventListener('click', () => handleCategorySelect(categoryFilter, filters));
    });
    const noFilter = appendNewElement('div', categoryDiv, { class: 'categoryFilter', innerText: 'All products', category: '' });
    noFilter.classList.add('selected');
    noFilter.addEventListener('click', () => handleCategorySelect(noFilter, filters));
}

function loadSearchBar(anchor) {
    const filters = { category: '', keyWords: [''] };
    const searchBar = appendNewElement('div', anchor, { class: 'searchBar' });
    loadCategories(searchBar, filters);
    loadSearchInput(searchBar, filters);
}

function loadProductsPage(products) {
    const productsPage = createNewElement('div', { class: 'productsPage' });
    loadSearchBar(productsPage);
    const header = appendNewElement('h1', productsPage, { fonstSize: 'xx-large', innerText: 'Products' });
    loadCards(products, productsPage);
    return productsPage;
}











const homeButton = document.getElementsByClassName('goHome')[0];
const addButton = document.getElementsByClassName('addProduct')[0];

homeButton.addEventListener('click', () => goHome(main));
addButton.addEventListener('click', () => goToPage(main, loadEditPage()));

async function start() {
    const products = await getData();
    const productsPage = loadProductsPage(products);
    goToPage(main, productsPage);
}
start();