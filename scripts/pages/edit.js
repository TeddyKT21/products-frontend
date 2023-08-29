import { appendNewElement, createNewElement, appendIconButton, appendInputs } from "../util/elementCreation.js"
import { addProduct, categories, updateProduct } from "../util/data.js";

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

function appendNavEdit(editPage, product,router) {
    const navigateOptions = appendNewElement('div', editPage, { class: 'navigateOptions' });
    appendIconButton(navigateOptions, 'arrow_back', {}, () => router.goBack());
    if (product) appendIconButton(navigateOptions, 'pageview', {}, () => router.detailsPage(product));
    appendIconButton(navigateOptions, 'home', {}, () => router.goHome());
}

export function loadEditPage(product = null,router) {
    const editPage = createNewElement('div', { class: 'editPage' });
    appendNavEdit(editPage, product,router);
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
        router.productsPage();
    })
    return editPage;

}