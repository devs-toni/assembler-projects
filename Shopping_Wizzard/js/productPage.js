const thumbnails = document.querySelector('.product-thumbnails');
const thumbnailsChildren = thumbnails.children
const image = document.querySelector('.product-image');
const productPageForm = document.getElementById('product-page-form');
const productTitle = document.querySelector('#productTitle');
const productPrice = document.querySelector('#productPrice');
const batterySelect = document.querySelector('#batterySelect');
const colorSelect = document.querySelector('#colorSelect');
const productPage = document.querySelector('.product-page');
const orderPage = document.querySelector('.order-form');
const headerMainProduct = document.querySelector('.header-main-product');
const headerMainOrder = document.querySelector('.header-main-order');
const footerMainProduct = document.querySelector('.footer-main-product');
const footerMainOrder = document.querySelector('.footer-main-order');

const product = new Product();

function submitForm(e) {
    e.preventDefault();

    // Create product
    product.color = e.target.color.value;
    product.batteryCapacity = e.target.battery.value;
    switch (e.target.color.value) {
        case 'black':
            product.productName = 'Scooter MQT45BK';
            break;
        case 'white':
            product.productName = 'Scooter MQT45W';
            break;
        case 'blue':
            product.productName = 'Scooter MQT45BE';
            break;
        case 'red':
            product.productName = 'Scooter MQT45R';
            break;
    }

    switch (e.target.battery.value) {
        case '10000mAh':
            product.price = 695;
            break;
        case '20000mAh':
            product.price = 795;
            break;
        case '30000mAh':
            product.price = 895;
    }

    // DOM change
    productPage.classList.add('hide');
    productPage.style.display = 'none';
    orderPage.classList.remove('hide');
    headerMainProduct.classList.add('hide');
    headerMainProduct.style.display = 'none';
    headerMainOrder.classList.remove('hide');
    footerMainProduct.classList.add('hide');
    footerMainProduct.style.display = 'none';
    footerMainOrder.classList.remove('hide');

    removeEventListener('submit', submitForm, true);
    removeEventListener('click', changeBatteryModel, true);
    return product;
}

function getThumbnails(color) {
    for (let i = 0; i < 4; i++) {
        let img =
            `<img 
                onclick="changeImage(${i + 1}, '${color}')" 
                src="./assets/products/${color}/thumbnails/thumb-${color}-${i + 1}.png" 
                width="80px" 
                alt="${color}-${i + 1}" 
                image-number="${i + 1}"
            >`;
        thumbnails.insertAdjacentHTML('beforeend', img)
    }
}

function changeImage(imageNumber, color) {
    image.children[0].src = `./assets/products/${color}/${color}-${imageNumber}.png`;
}

function changeColor(color) {
    thumbnails.innerHTML = '';
    image.children[0].src = `./assets/products/${color}/${color}-1.png`;
    image.children[0].alt = color;
    getThumbnails(color);

    switch (color) {
        case 'black':
            productTitle.innerHTML = '';
            productTitle.textContent = 'Scooter MQT45BK';
            break;
        case 'white':
            productTitle.innerHTML = '';
            productTitle.textContent = 'Scooter MQT45W';
            break;
        case 'blue':
            productTitle.innerHTML = '';
            productTitle.textContent = 'Scooter MQT45BE';
            break;
        case 'red':
            productTitle.innerHTML = '';
            productTitle.textContent = 'Scooter MQT45R';
            break;
    }

}

function changeBatteryModel(e) {
    switch (e.target.value) {
        case '10000mAh':
            productPrice.innerHTML = '';
            productPrice.textContent = '695 €';
            break;
        case '20000mAh':
            productPrice.innerHTML = '';
            productPrice.textContent = '795 €';
            break;
        case '30000mAh':
            productPrice.innerHTML = '';
            productPrice.textContent = '895 €';
            break;
    }
}

function changeColorModel(e) {

}


getThumbnails('black');
productPageForm && productPageForm.addEventListener('submit', (e) => submitForm(e));
batterySelect.addEventListener('click', (e) => changeBatteryModel(e));

