import { addProductServer, deleteProductServer, getProducts, updateProductServer,sendLoginRequest,sendSignUpRequest } from "./fetch.js";

let data = null;
export let categories;

const getToken = () => JSON.parse(localStorage.getItem('token'));
const setToken = (token) => localStorage.setItem('token', JSON.stringify(token));


export async function getData() {
    data = await getProducts();
    console.log(data);
    categories = data.map(p => p.category).filter((v, i, arr) => arr.indexOf(v) === i);
    return data;
}


export function addProduct(product) {
    product.id = data.length + 1;
    data.push(product);
    addProductServer(product,getToken());
}

export function updateProduct(product) {
    const index = data.findIndex(p => p.id === product.id);
    data[index] = { ...data[index], ...product };
    updateProductServer(product,product.id,getToken());
}

export function removeProduct(id) {
    const index = data.findIndex(p => p.id === id);
    data.splice(index, 1);
    deleteProductServer(id,getToken());
}



export const login = async (data) => {
    try {
        const {email, password} = data;
        const token = await sendLoginRequest(email, password);
        setToken(token);
        return token;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const signUp = async (data) => {
    try {
        const {email, password, admin} = data;
        const newUser = await sendSignUpRequest(email, password, admin);
        return newUser;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}



