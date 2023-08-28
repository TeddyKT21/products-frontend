
import data from "./data.js";

const router = (page) =>{
    const main_page = document.getElementById("main-page");
    const nav_bar = document.getElementById("navbar");
    const product_page = document.getElementById("product-page");
    const edit_page = document.getElementById("edit-page");
    const add_page = document.getElementById("add-page");
    

    main_page.classList.add('none-div');
    product_page.classList.add('none-div');
    nav_bar.classList.add('none-div');
    edit_page.classList.add('none-div');
    add_page.classList.add('none-div');
    
    if (page ==='product-page') {
        product_page.classList.remove('none-div');
    }
    if (page === 'edit-page'){
        edit_page.classList.remove('none-div');
    }
    if (page === 'add-page'){
        add_page.classList.remove('none-div');
    }
    if (page === 'main-page'){
        main_page.classList.remove('none-div');
        nav_bar.classList.remove('none-div');
    }
};

const refreshProducts = () =>{

    let productsNumber = products_cards.length;

    for (let index = 0; index < productsNumber; index++) {
        products_cards[0].remove();
    }

    for (let index = 0; index < data.length; index++) {
        addProductCard(index);
    }
    products_cards = document.getElementsByClassName("product-card");
    let img_divs = document.getElementsByClassName("product-img");
    for (let current_img = 0; current_img < img_divs.length; current_img++) {
        img_divs[current_img].addEventListener('click', () =>{
            createProductPage(current_img);
        })   
    }
    const edit_btns = document.getElementsByClassName("action-button edit");

    for (let button = 0; button < edit_btns.length; button++) {
        edit_btns[button].addEventListener('click', () =>{
            clickEditButton(button);
        });
    }

    let delete_btns = document.getElementsByClassName("action-button delete");

    for (let button = 0; button < delete_btns.length; button++) {
        delete_btns[button].addEventListener('click', ()=> {
            clickDeleteButton(button);
        });
    }
    products_amount = document.getElementsByClassName("amount-circle");
};


const addProductCard = (currentItem) =>{
    addProductCardDiv(currentItem);

    product_div_card = document.getElementById(`product-card-${currentItem}`);
    addImageDiv(product_div_card);

    const divImage = document.getElementsByClassName("product-img")[currentItem];
    addImage(currentItem, divImage);

    addBottomCard();

    addH3(currentItem);
    addHr();

    addProductAmountDiv();

    const product_amount_div = document.getElementsByClassName('product-amount')[currentItem];

    addButtons(product_amount_div);

    addStar(currentItem);

    addProductActionDiv();
    const productActionDiv = document.getElementsByClassName("product-actions")[currentItem];

    addActionButtons(productActionDiv);
};

const addProductCardDiv = (currentItem) =>{
    const addDiv = document.createElement('div');
    addDiv.classList.add('product-card');
    addDiv.id = `product-card-${currentItem}`;
    div_container.appendChild(addDiv);
};

const addImageDiv = (father) =>{
    const addDiv = document.createElement('div');
    addDiv.classList.add('product-img');
    father.appendChild(addDiv);
};


const addImage = (currentItem, father) =>{
    const image = document.createElement('img');
    image.classList.add('item-img');
    image.src = data[currentItem].image;
    father.appendChild(image);
};

const addBottomCard = () =>{
    bottom_card = document.createElement('div');
    bottom_card.classList.add('bottom-card');
    product_div_card.appendChild(bottom_card);
};

const addH3 = (currentItem) =>{
    const h3 = document.createElement('h3');
    h3.classList.add('product-title');
    h3.innerText = data[currentItem].title;
    bottom_card.appendChild(h3);
};

const addHr = () =>{
    const hr = document.createElement('hr');
    bottom_card.appendChild(hr);
};

const addProductAmountDiv = () =>{
    const product_amount_div = document.createElement('div');
    product_amount_div.classList.add('product-amount');
    bottom_card.appendChild(product_amount_div);
};


const addButtons = (father) =>{
    const subtract_button = document.createElement('i');
    subtract_button.classList.add('amount-button');
    subtract_button.classList.add('subtract');
    subtract_button.classList.add("material-icons");
    subtract_button.innerText = "exposure_neg_1";
    father.appendChild(subtract_button);

    // <div class="amount-circle">5</div>
    const amount_circle = document.createElement('div');
    amount_circle.classList.add('amount-circle');
    amount_circle.innerText =  Math.floor(Math.random() * 100) + 1;
    father.appendChild(amount_circle);

    // <button class="amount-button add">+</button>
    const add_button = document.createElement('i');
    add_button.classList.add('amount-button');
    add_button.classList.add('add');
    add_button.classList.add("material-icons");
    add_button.innerText = 'exposure_plus_1';
    father.appendChild(add_button);
};

const addStar = (currentItem) =>{
    if(parseFloat(data[currentItem].rating.rate) > 4.5){
        const star = document.createElement('p');
        star.innerText = '⭐';
        star.classList.add('star');
        bottom_card.appendChild(star);
    }
};

const addProductActionDiv = () =>{
    const productActionDiv = document.createElement('div');
    productActionDiv.classList.add('product-actions');
    product_div_card.appendChild(productActionDiv);
};


const addActionButtons = (father) =>{
    const delete_button = document.createElement('i');
    delete_button.classList.add('action-button');
    delete_button.classList.add('delete');
    delete_button.classList.add("material-icons");
    delete_button.innerText = 'delete';
    father.appendChild(delete_button);

    const edit_button = document.createElement('i');
    edit_button.classList.add('action-button');
    edit_button.classList.add('edit');
    edit_button.classList.add('material-icons');
    edit_button.innerText = 'edit';
    father.appendChild(edit_button);
};

const clickMenBtn = () =>{
    for (let index = 0; index < nav_buttons.length; index++) {
        nav_buttons[index].classList.remove("pressed_button");
    }

    men_btn.classList.add("pressed_button");
    for (let item = 0; item < data.length; item++) {
        if(data[item].category !== "men's clothing") {
            products_cards[item].classList.add("none-div");
        }
    }
};

const clickWomanBtn = () =>{
    for (let index = 0; index < nav_buttons.length; index++) {
        nav_buttons[index].classList.remove("pressed_button");
    }

    women_btn.classList.add("pressed_button");

    for (let item = 0; item < products_cards.length; item++) {
        if(data[item].category !== "women's clothing") {
            products_cards[item].classList.add("none-div");
        }
    }
};

const clickJewelryBtn = () =>{
    for (let index = 0; index < nav_buttons.length; index++) {
        nav_buttons[index].classList.remove("pressed_button");
    }

    jewelry_btn.classList.add("pressed_button");

    for (let item = 0; item < products_cards.length; item++) {
        if(data[item].category !== "jewelery") {
            products_cards[item].classList.add("none-div");
        }
    }
};

const clickElectronicsBtn = () =>{
    for (let index = 0; index < nav_buttons.length; index++) {
        nav_buttons[index].classList.remove("pressed_button");
    }

    electronics_btn.classList.add('pressed_button');

    for (let item = 0; item < products_cards.length; item++) {
        if(data[item].category !== "electronics") {
            products_cards[item].classList.add("none-div");
        }
    }
};

const allProductsBtn = () =>{
    for (let index = 0; index < nav_buttons.length; index++) {
        nav_buttons[index].classList.remove("pressed_button");
    }

    all_pruducts_btn.classList.add("pressed_button");
    for (let item = 0; item < products_cards.length; item++) {
            products_cards[item].classList.remove("none-div");
        }
};

const createProductPage = (currentItem) =>{
    router('product-page');

    const product_image = document.getElementById("product-image");
    product_image.src = data[currentItem].image;

    const p_title = document.getElementById("p-product-title");
    p_title.innerText = data[currentItem].title;
    
    const p_description = document.getElementById("p-product-description");
    p_description.innerText = data[currentItem].description;

    const p_category = document.getElementById("p-product-category")
    p_category.innerText = data[currentItem].category;

    const p_price = document.getElementById("p-product-price");
    p_price.innerText = data[currentItem].price;

    const p_quantity = document.getElementById("p-product-quantity");
    p_quantity.innerText = products_amount[currentItem].innerText;

    product_number = currentItem;    
};

const clickEditButton = (button_num) =>{
    router('edit-page');
    const input_product_title = document.getElementById("input-product-title");
    const input_product_category = document.getElementById("input-product-category");
    const input_product_price = document.getElementById("input-product-price");
    const input_product_image = document.getElementById("input-product-image");
    const input_product_quantity = document.getElementById("input-product-quantity");
    const input_product_description = document.getElementById("input-product-description");

    input_product_title.value = data[button_num].title;
    input_product_category.value = data[button_num].category;
    input_product_price.value = data[button_num].price;
    input_product_image.value = data[button_num].image;
    input_product_quantity.value = products_amount[button_num].innerText;
    input_product_description.value = data[button_num].description;

    product_number = button_num;
};

const clickDeleteButton = (button) =>{
    data.splice(button, 1);
    products_cards[button].remove();
    refreshProducts();
};

const searchClick = () =>{
    const search_input = document.getElementById("search-input");
    if(search_input.value!==""){
        allProductsBtn();
        for (let item = 0; item < products_cards.length; item++) {
            if(!(
                data[item].title.includes(search_input.value) ||
                data[item].description.includes(search_input.value) ||
                data[item].category.includes(search_input.value))) {
                products_cards[item].classList.add("none-div");
            }
        }
    }
};

const editData = () =>{
    const input_product_title = document.getElementById("input-product-title");
    const input_product_category = document.getElementById("input-product-category");
    const input_product_price = document.getElementById("input-product-price");
    const input_product_image = document.getElementById("input-product-image");
    const input_product_quantity = document.getElementById("input-product-quantity");
    const input_product_description = document.getElementById("input-product-description");

    data[product_number].title = input_product_title.value;
    data[product_number].category = input_product_category.value;
    data[product_number].price = input_product_price.value;
    data[product_number].image = input_product_image.value;
    products_amount[product_number].innerText = input_product_quantity.value;
    data[product_number].description = input_product_description.value

    refreshProducts();
};




let product_div_card;
let bottom_card;

const div_container = document.getElementById("product-container");


for (let item = 0; item < data.length; item++) {
    addProductCard(item);
}

let img_divs = document.getElementsByClassName("product-img");
for (let current_img = 0; current_img < img_divs.length; current_img++) {
    img_divs[current_img].addEventListener('click', () =>{
        createProductPage(current_img);
    })   
}

const home_button = document.getElementById("home-button");
home_button.addEventListener('click', () => {
    router("main-page");
});



let products_cards = document.getElementsByClassName("product-card");
const nav_buttons = document.getElementsByClassName("pressed_button");
let products_amount = document.getElementsByClassName("amount-circle");

const all_pruducts_btn = document.getElementById("all-pruducts-btn");
all_pruducts_btn.addEventListener('click', () => allProductsBtn());

const electronics_btn = document.getElementById("electronics-btn");
electronics_btn.addEventListener('click', () => {
    allProductsBtn();
    clickElectronicsBtn();
})

const jewelry_btn = document.getElementById("jewelry-btn");
jewelry_btn.addEventListener('click', () =>{
    allProductsBtn();
    clickJewelryBtn();
})

const men_btn = document.getElementById("men-btn");
men_btn.addEventListener('click', () => {
    allProductsBtn();
    clickMenBtn();
});

const women_btn = document.getElementById("women-btn");
women_btn.addEventListener('click', () => {
    allProductsBtn();
    clickWomanBtn();
});


let edit_btns = document.getElementsByClassName("action-button edit");

for (let button = 0; button < edit_btns.length; button++) {
    edit_btns[button].addEventListener('click', () =>{
        clickEditButton(button);
    });
}


let product_number;
let delete_btns = document.getElementsByClassName("action-button delete");

for (let button = 0; button < delete_btns.length; button++) {
    delete_btns[button].addEventListener('click', ()=> {
        clickDeleteButton(button);
    });
}

const add_button = document.getElementById("add-button");
add_button.addEventListener('click', () =>{
    router('add-page');
})

const search_btn = document.getElementById("search_btn");
search_btn.addEventListener('click', ()=> {
    searchClick();
})

const product_page_back = document.getElementById("product-page-back");
product_page_back.addEventListener('click',  ()=> {
    router('main-page');
});

const product_page_edit = document.getElementById("product-page-edit");
product_page_edit.addEventListener('click',  ()=> {
    router('edit-page');
    clickEditButton(product_number);
});

const product_page_home = document.getElementById("product-page-home");
product_page_home.addEventListener('click',  ()=> {
    router('main-page');
});

const edit_page_back = document.getElementById("edit-page-back");
const edit_page_product = document.getElementById("edit-page-product");
const edit_page_home = document.getElementById("edit-page-home");

edit_page_back.addEventListener('click', () => {
    router('main-page');
});

edit_page_product.addEventListener('click', () => {
    router('edit-page');
    createProductPage(product_number);
});

edit_page_home.addEventListener('click', () => {
    router('main-page');
});

const confirm_edit = document.getElementById("confirm-edit");

confirm_edit.addEventListener('click', (event) => {
    event.preventDefault();
    editData()
    router('main-page');
})

const confirm_add = document.getElementById("confirm-add");

confirm_add.addEventListener('click', (event) => {
    event.preventDefault();
    router('main-page');
});