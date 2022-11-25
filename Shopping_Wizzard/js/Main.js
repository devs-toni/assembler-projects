//Variables ********************************
const user = new User();
const delivery = new Shipment();
const product = new Product();

//Product Form EventListeners ***********************************************************************************

const addProductEventListeners = () => {
    const batterySelect = document.querySelector('#batterySelect');
    const colorInputs = document.querySelectorAll('[name="color"]');
    const productPageForm = document.getElementById('productForm');
    const btnExit = document.getElementById('btnExit');

    product.getThumbnails('black');
    productPageForm && productPageForm.addEventListener('submit', (e) => product.submitForm(e));


    batterySelect.addEventListener('click', (e) => product.changeBatteryModel(e));
    colorInputs.forEach((e) => e.addEventListener('click', () => product.changeColor(e.value)));

    btnExit.addEventListener('click', () => {
        productPage.classList.remove('hide');
        productPage.style.display = 'flex';
        orderPage.classList.add('hide');
        headerMainProduct.classList.remove('hide');
        headerMainProduct.style.display = 'flex';
        headerMainOrder.classList.add('hide');
        footerMainProduct.classList.remove('hide');
        footerMainProduct.style.display = 'flex';
        footerMainOrder.classList.add('hide');
        registeringPopupDiv.classList.add('hide');
        user.removeUser();
        product.removeProduct();
        delivery.removeShipment();
        clearInterval(popupInterval);
    });
}


//Address Form EventListeners *************************************************************************************
const formElements = ['firstname', 'lastname', 'addressOne', 'addressTwo', 'postalCode', 'phone'];
const profileElements = ['username', 'email', 'password', 'password2'];

const addProfileEventListeners = () => {
    profileElements.forEach((profileInput) => {
        document.getElementById(profileInput).addEventListener('focusout', validateProfile);
        document.getElementById(profileInput).addEventListener('keydown', validateProfile);
    });

    const profileForm = document.getElementById('profileForm');
    profileForm && profileForm.addEventListener('submit', (e) => user.submitLogin(e));
}

const addAddressEventListeners = () => {
    formElements.forEach((element) => {
        document.getElementById(element).addEventListener('focusout', validateForm);
        document.getElementById(element).addEventListener('keydown', validateForm);
    });

    document.getElementById('country').addEventListener('change', (event) => changeCountryPhoneSelect(event));
    const addressForm = document.getElementById('addressForm');
    addressForm && addressForm.addEventListener('submit', (e) => user.submitAddress(e));
}

const removeAddressEventListeners = () => {
    console.log(formElements);
    formElements.forEach((element) => {
        document.getElementById(element).removeEventListener('keydown', validateForm);
        document.getElementById(element).removeEventListener('focusout', validateForm);
    });

    document.getElementById('country').removeEventListener('change', changeCountryPhoneSelect);
}

const removeProfileEventListeners = () => {
    console.log(profileElements);
    profileElements.forEach((element) => {
        document.getElementById(element).removeEventListener('keydown', validateProfile);
        document.getElementById(element).removeEventListener('focusout', validateProfile);
    });
}

const changeCountryPhoneSelect = (event) => {
    const select = document.getElementById('countryPhone');
    const optionToSelect = document.querySelector(`[data-country=${event.target.value}]`);
    select.value = optionToSelect.value;
    select.removeAttribute('disabled');
}

const validateProfile = (event) => {
    const profileElement = event.target;
    if (event.type === 'keydown') setErrorField(profileElement, 'hide');
    else {
        switch (event.target.id) {
            case 'username':
                if (profileElement.value.length < 5 || profileElement.value.length > 20) {
                    setErrorField(profileElement, 'show');
                }
                break;
            case 'email':
                if (profileElement.value.length > 50 || !profileElement.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    setErrorField(profileElement, 'show');
                }
                break;
            case 'password':
                /*                 if (profileElement.value.length < 8) {
                                    setErrorField(profileElement, 'show', '**Password must be at least 8 characters');
                                } else if (profileElement.value.length > 20) {
                                    setErrorField(profileElement, 'show', "**Password length must not exceed 20 characters");
                                } else if (profileElement.value.search(/[0-9]/) < 0) {
                                    setErrorField(profileElement, 'show', "**Password must contain at least 1 number");
                                } else if (profileElement.value.search(/[A-Z]/) < 0) {
                                    setErrorField(profileElement, 'show', "**Password must contain at least 1 uppercase letter");
                                } else if (profileElement.value.search(/[a-z]/) < 0) {
                                    setErrorField(profileElement, 'show', "**Password must contain at least 1 lowercase letter");
                                } else if (!profileElement.value.search(/[^[!@#\$%\^\&*\)\(+=._-]+$]/) < 0) {
                                    setErrorField(profileElement, 'show', "**Password must contain at least 1 special character");
                                } */
                break;

            case 'password2':
                let pw1 = document.getElementById("password").value;
                if (pw1 != profileElement.value) {
                    setErrorField(profileElement, 'show', "Passwords do not match");
                } else {
                    setErrorField(profileElement, 'hide');
                }
        }
    }

}

const validateForm = (event) => {
    const domElement = event.target;
    if (event.type === 'keydown') setErrorField(domElement, 'hide');

    else {
        switch (event.target.id) {
            case 'firstname': case 'lastname':
                if (domElement.value.length > 20) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'addressOne': case 'addressTwo':
                if (domElement.value.length > 50) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'postalCode':
                if (!domElement.value.match(/^\d{5}(-\d{4})?$/)) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'phone':
                if (!domElement.value.match(/^[0-9]{9}$/)) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'giftMessage':
                if (domElement.value.length > 200) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
        }
        if (domElement.value.length === 0) {
            setErrorField(domElement, 'hide');
        }
    }
}

const setErrorField = (domElement, action, message) => {
    let errorText = document.querySelector(`[data-target=${domElement.id}]`);
    let originalText = document.querySelector(`label[for=${domElement.id}]`).textContent;

    if (message) {
        errorText.textContent = message;
        return;
    }

    if (action === 'show') {
        domElement.style.color = 'red';
        domElement.style.border = '3px solid red';
        errorText.textContent = `El campo ${originalText} no es correcto`;

    } else {
        domElement.style.color = 'black';
        domElement.style.border = '1px solid black';
        errorText.textContent = '';
    }
}

// Shipping Form Event Listeners *********************************************************************************

const addShipmentEventListeners = () => {
    const isGift = document.getElementById('isGift').addEventListener('click', toggleGiftOptions);
    document.getElementById('giftMessage').addEventListener('keydown', validateForm);
    document.getElementById('giftMessage').addEventListener('focusout', validateForm);
    document.getElementsByName('radioShipType').forEach(el => {
        el.addEventListener('change', chooseShipmentType);
    });
    const shipment = document.getElementById('shipmentForm');
    shipment.addEventListener('submit', (e) => delivery.submitShipment(e));
    const confirmOrderForm = document.querySelector('#confirmOrderForm');
    confirmOrderForm.addEventListener('submit', (e) => delivery.submitConfirmForm(e));
}

const removeShipmentEventListeners = () => {
    const isGift = document.getElementById('isGift').removeEventListener('click', toggleGiftOptions);
    document.getElementById('giftMessage').removeEventListener('keydown', validateForm);
    document.getElementById('giftMessage').removeEventListener('focusout', validateForm);
    document.getElementsByName('radioShipType').forEach(el => {
        el.removeEventListener('change', chooseShipmentType);
    });
}

const chooseShipmentType = (event) => {
    document.getElementById('shipDate').classList.add('visible');
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const hours = event.target.value;
    const now = new Date();
    let minDate = new Date();
    let maxDate = new Date();

    switch (hours) {
        case '72':
            minDate.setDate(now.getDate() + 3);
            maxDate.setDate(now.getDate() + 4);
            break;
        case '48':
            minDate.setDate(now.getDate() + 2);
            maxDate.setDate(now.getDate() + 3);
            break;
        case '24':
            minDate.setDate(now.getDate() + 1);
            maxDate.setDate(now.getDate() + 2);
            break;
    }
    document.getElementById('minDate').style.fontWeight = 'bold';
    document.getElementById('maxDate').style.fontWeight = 'bold';
    document.getElementById('minDate').textContent = `${minDate.getDate()} de ${months[minDate.getMonth()]} de ${minDate.getFullYear()}`;
    document.getElementById('maxDate').textContent = `${maxDate.getDate()} de ${months[maxDate.getMonth()]} de ${maxDate.getFullYear()}`;
}



const toggleGiftOptions = (event) => {
    const giftOptions = document.getElementById('shipGiftOptions');
    if (event.target.checked) {
        giftOptions.classList.add('visible');
    } else {
        giftOptions.classList.remove('visible');
    }
}

//Initialize EventListeners *******************************
addProfileEventListeners();
addAddressEventListeners();
addShipmentEventListeners();
addProductEventListeners();