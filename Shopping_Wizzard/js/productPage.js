const thumbnails = document.querySelector('.product-thumbnails');
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
const colorInputs = document.querySelectorAll('[name="color"]');

product.getThumbnails('black');
productPageForm && productPageForm.addEventListener('submit', (e) => product.submitForm(e));
batterySelect.addEventListener('click', (e) => product.changeBatteryModel(e));
colorInputs.forEach((e) => e.addEventListener('click', () => product.changeColor(e.value)))

