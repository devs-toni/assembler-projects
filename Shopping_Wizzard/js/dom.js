const formsSubmit = document.getElementById('finalSubmit');
const previousButton = document.getElementById('btnPrev');
const exitButton = document.getElementById('btnExit');
const footer = document.getElementById('footer');
const allErrors = document.querySelectorAll('.error');
const allInputs = document.querySelectorAll('input');

// Product page
const productPage = document.querySelector('.product-page');
const productForm = document.getElementById('productForm');
const headerMainProduct = document.querySelector('.header-main-product');
const headerMainOrder = document.querySelector('.header-main-order');
const footerMainProduct = document.querySelector('.footer-main-product');
const footerMainOrder = document.querySelector('.footer-main-order');
const productPrice = document.querySelector('#productPrice');
const productTitle = document.querySelector('#productTitle');
const thumbnails = document.getElementById('productThumbnails');
const image = document.getElementById('productImage');

// Product Form
const batterySelector = document.getElementById('batterySelect');
const colorInputs = document.getElementsByName('color');

// Profile Form
const profilePage = document.getElementById('div-profile');
const profileForm = document.getElementById('profileForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Address Form
const addressPage = document.getElementById('div-address');
const addressForm = document.getElementById('addressForm');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const birthday = document.getElementById('birthday');
const addressOne = document.getElementById('addressOne');
const addressTwo = document.getElementById('addressTwo');
const postalCode = document.getElementById('postalCode');
const country = document.getElementById('country');
const countryPhone = document.getElementById('countryPhone');
const phone = document.getElementById('phone');
const regularAddress = document.getElementById('regularAddress');


// Shipment Form
const shipmentPage = document.getElementById('div-shipment');
const shipmentForm = document.getElementById('shipmentForm');
const typeShip = document.getElementsByName('radioShipType');
const dateShip = document.getElementById('shipDate');
const isGift = document.getElementById('isGift');
const giftTitle = document.getElementById('giftTitle');
const giftMessage = document.getElementById('giftMessage');
const giftImageFile = document.getElementById('giftImageFile');
const giftOptions = document.getElementById('shipGiftOptions');

// Resume Page
const orderPage = document.querySelector('.order-form');
const confirmOrder = document.querySelector('.confirm-order');
const orderImg = document.querySelector('#confirmOrderImg');
const orderProductName = document.querySelector('#confirmOrderProduct');
const orderBattery = document.querySelector('#confirmOrderBattery');
const orderColor = document.querySelector('#confirmOrderColor');
const orderPrice = document.querySelector('#confirmOrderPrice');
const orderShipping = document.querySelector('#confirmOrderShipping');
const orderTotalPice = document.querySelector('#confirmOrderTotalPrice');

// Main Logic Changes
const changeDomToNextForm = (previous, next) => {
    if (previous === 'product' && next === 'profile') {
        //Reset product
        resetProductForm();

        removeProductEventListeners();
        addProfileEventListeners();
        // Change article 'PRODUCT' to section 'ORDER'
        productPage.classList.add('hide');
        orderPage.classList.remove('hide');
        // Change Headers and Footers
        headerMainProduct.classList.add('hide');
        headerMainOrder.classList.remove('hide');
        footerMainProduct.classList.add('hide');
        footerMainOrder.classList.remove('hide');
        formsSubmit.setAttribute('form', 'profileForm');

        // Hide the previous button
        previousButton.classList.add('hide');


    } else if (previous === 'profile' && next === 'address') {
        resetProfileForm();

        removeProfileEventListeners();
        addAddressEventListeners();

        profilePage.classList.remove('form-step-active');
        addressPage.classList.add('form-step-active');
        formsSubmit.setAttribute('form', 'addressForm');
        // Show the previous button
        previousButton.classList.remove('hide');

    } else if (previous === 'address' && next === 'ship') {
        resetAddressForm();

        removeAddressEventListeners();
        addShipmentEventListeners();

        addressPage.classList.remove('form-step-active');
        shipmentPage.classList.add('form-step-active');
        formsSubmit.setAttribute('form', 'shipmentForm');

    } else if (previous === 'ship' && next === 'confirm') {
        resetShipmentForm();

        removeShipmentEventListeners();
        //TODO Confirm EventListeners ***************************************************************************************************

        shipmentPage.classList.remove('form-step-active');
        document.getElementById('div-confirm').classList.add('form-step-active');
        // The next form is controlled by other button
        formsSubmit.setAttribute('form', '');
        // Hide footer to show the delivery resume
        footer.classList.add('hide');
    } else if (previous === 'address' && next === 'profile') {
        resetAddressForm();

        removeAddressEventListeners();
        addProfileEventListeners();

        formsSubmit.setAttribute('form', 'profileForm');
        addressPage.classList.remove('form-step-active');
        profilePage.classList.add('form-step-active');
        // Hide the previous button
        previousButton.classList.add('hide');

    } else if (previous === 'ship' && next === 'address') {
        resetShipmentForm();

        removeShipmentEventListeners();
        addAddressEventListeners();

        shipmentPage.classList.remove('form-step-active');
        addressPage.classList.add('form-step-active');
        formsSubmit.setAttribute('form', 'addressForm');
    } else if (previous === 'confirm' && next === 'ship') {
        //resetConfirmForm();

        //removeConfirmEventListeners();
        addShipmentEventListeners();
        
        confirmOrder.classList.remove('form-step-active');
        shipmentPage.classList.add('form-step-active');
        formsSubmit.setAttribute('form', 'shipmentForm');
    }
}

// Product Page Methods
const changeProductPrice = (price) => {
    productPrice.innerHTML = '';
    productPrice.textContent = price;
}

const changeProductTitle = (title) => {
    productTitle.innerHTML = '';
    productTitle.textContent = title;
}

const insertImageThumbnails = (img) => {
    thumbnails.insertAdjacentHTML('beforeend', img)
}

const resetThumbnails = () => {
    thumbnails.innerHTML = '';
}

const changeImageColor = (color) => {
    image.children[0].src = `./assets/products/${color}/${color}-1.png`;
    image.children[0].alt = color;
}

// Resume Page
const assignConfirmHtmlValues = () => {
    orderImg.src = product.image;
    orderProductName.textContent = product.productName;
    orderBattery.textContent = product.batteryCapacity;
    orderColor.textContent = product.color;
    orderPrice.textContent = product.price;
    orderShipping.textContent = delivery.cost;
    orderTotalPice.textContent = parseInt(product.price) + parseInt(delivery.cost);
}


// Resets
const resetAllForms = () => {
    resetProfileForm();
    resetAddressForm();
    resetShipmentForm();
}

const resetProductForm = () => {
    batterySelector.value = '10000mAh';
    colorInputs.forEach(radio => radio.checked = false);
}

const resetProfileForm = () => {
    resetAllErrors();
    username.value = '';
    email.value = '';
    password.value = '';
    password2.value = '';
}

const resetAddressForm = () => {
    resetAllErrors();
    firstname.value = '';
    lastname.value = '';
    birthday.value = '';
    addressOne.value = '';
    addressTwo.value = '';
    postalCode.value = '';
    country.value = '';
    countryPhone.value = '';
    phone.value = '';
    regularAddress.checked = false;
}

const resetShipmentForm = () => {
    resetAllErrors();
    typeShip.forEach(radio => radio.checked = false);
    isGift.checked = false;
    giftTitle.value = '';
    giftMessage.value = '';
    giftImageFile.value = '';
}

const resetOrderFormsView = () => {
    // Page Product
    headerMainProduct.classList.remove('hide');
    headerMainProduct.style.display = 'flex';
    productPage.classList.remove('hide');
    productPage.style.display = 'flex';
    footerMainProduct.classList.remove('hide');
    footerMainProduct.style.display = 'flex';

    headerMainOrder.classList.add('hide');
    orderPage.classList.add('hide');
    footerMainOrder.classList.add('hide');

    // Form Views
    profilePage.classList.add('form-step-active');
    addressPage.classList.remove('form-step-active');
    shipmentPage.classList.remove('form-step-active');
}

const resetAllErrors = () => {
    allErrors.forEach(err => {
        err.textContent = '';
    });
    allInputs.forEach(input => {
        input.style.border = '1px solid black';
    });
}