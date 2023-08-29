
const SERVER_URL = 'https://products-server.onrender.com';

async function sendHttpRequest(url, method = 'GET', body = {}) {
    if (method.toLocaleLowerCase() !== 'get') {
        const rawData = await fetch(url, { method, 
            body: JSON.stringify(body), 
            headers: { 'Content-Type': 'application/json' } 
        });
        const data = await rawData.json();
        return data;
    }
    else {
        const rawData = await fetch(url);
        const data = await rawData.json();
        return data;
    }
}

export const sendLoginRequest = (email, password) => sendHttpRequest(`${SERVER_URL}/users/login`, 'POST', { email, password });
export const sendSignUpRequest = (email, password, admin) => sendHttpRequest(`${SERVER_URL}/users/signup`, 'POST', { email, password, admin });
export const getProducts = () => sendHttpRequest(`${SERVER_URL}/products`);
export const deleteProductServer = (id, token) => sendHttpRequest(`${SERVER_URL}/products/${id}`, 'DELETE', { token });
export const updateProductServer = (product, id, token) => sendHttpRequest(`${SERVER_URL}/products/${id}`, 'PUT', { token, product });
export const addProductServer = (product, token) => sendHttpRequest(`${SERVER_URL}/products`, 'POST', { token, product });