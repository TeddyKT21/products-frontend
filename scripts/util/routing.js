import { loadDetailsPage } from "../pages/details.js";
import { loadEditPage } from "../pages/edit.js";
import { loadLogin } from "../pages/login.js";
import { loadProductsPage } from "../pages/products.js";
import { loadSignUp } from "../pages/signUp.js";
import { getData } from "./data.js";

const history = [];
const main = document.getElementById('main');

function goToPage(main, page) {
    if (history.length) main.innerHTML = '';
    history.push(page);
    main.appendChild(page);
}

function goBack(main) {
    const currentPage = history.pop();
    main.removeChild(currentPage);
    main.appendChild(history[history.length - 1]);
}

function goHome(main) {
    history.splice(1, history.length - 1);
    goToPage(main, history[0]);
}

export const ROUTER = {
    editPage: (product) => goToPage(main, loadEditPage(product, ROUTER)),
    productsPage: async () => goToPage(main, loadProductsPage(await getData(), ROUTER)),
    detailsPage: (product) => goToPage(main, loadDetailsPage(product, ROUTER)),
    login: () => goToPage(main,loadLogin(ROUTER)),
    signUp: () => goToPage(main,loadSignUp(ROUTER)),
    goBack: () => goBack(main),
    goHome: () => goHome(main)
}
