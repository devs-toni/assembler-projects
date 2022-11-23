const thumbnails = document.querySelector('.product-thumbnails');
const thumbnailsChildren = thumbnails.children
const image = document.querySelector('.product-image');
const productPageForm = document.getElementById('product-page-form');
// DOM
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
    product.productName = 'Scooter MQT45F';
    product.color = e.target.color.value;
    product.batteryCapacity = e.target.battery.value;
    product.price = 695;

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
}


getThumbnails('black');
productPageForm && productPageForm.addEventListener('submit', (e) => submitForm(e));

