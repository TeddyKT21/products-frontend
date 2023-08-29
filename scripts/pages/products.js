import { appendNewElement, createNewElement, appendIconButton } from "../util/elementCreation.js"
import { categories, removeProduct, updateProduct } from "../util/data.js";


function appendCard(container, product,router) {
    const card = appendNewElement('div', container, { class: 'card', product });
    card.addEventListener('click', () => {
        router.detailsPage(product);
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

function loadCardBottom(card, product,router) {
    const bottomDiv = appendNewElement('div', card, { class: 'cardBottom' })
    const naviationOptions = appendNewElement('div', bottomDiv, { class: 'cardNav' });
    appendIconButton(naviationOptions, 'delete', {}, (e) => {
        e.stopPropagation();
        removeProduct(product.id);
        card.remove();
    });
    appendIconButton(naviationOptions, 'edit', {}, (e) => {
        e.stopPropagation();
        router.editPage(product);
    });
    const star = appendNewElement('i', bottomDiv, { innerText: 'star', class: 'material-symbols-outlined' })
    star.classList.add(product.rating?.rate > 4.5 ? 'fullStar' : 'emptyStar')
}

function loadCards(products, anchor,router) {
    const container = appendNewElement('div', anchor, { class: 'container' });
    products.forEach(product => {
        const card = appendCard(container, product,router);
        appendQuantityDiv(card, product);
        loadCardBottom(card, product,router);
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

export function loadProductsPage(products,router) {
    const productsPage = createNewElement('div', { class: 'productsPage' });
    loadSearchBar(productsPage);
    const header = appendNewElement('h1', productsPage, { fonstSize: 'xx-large', innerText: 'Products' });
    loadCards(products, productsPage,router);
    return productsPage;
}