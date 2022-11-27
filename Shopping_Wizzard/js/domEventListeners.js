//Variables ********************************
const product = new Product();
const user = new User();
const delivery = new Shipment();
const order = new Order();

//Product Form EventListeners ***********************************************************************************
const addProductEventListeners = () => {

    productForm && productForm.addEventListener('submit', e => product.submitProductForm(e));
    batterySelector.addEventListener('click', product.changeBatteryModel);
    colorInputs.forEach((input) => input.addEventListener('click', (e) => product.changeColor(input.value)));
}

const removeProductEventListeners = () => {
    productForm.removeEventListener('click', product.submitProductForm, true)
    batterySelector.removeEventListener('click', product.changeBatteryModel, true);
    colorInputs.forEach(color => removeEventListener('click', product.changeColor, true));
}


// Profile Form EventListeners *************************************************************************************
const profileElements = ['username', 'email', 'password', 'password2'];
const addProfileEventListeners = () => {
    profileElements.forEach((profileInput) => {
        document.getElementById(profileInput).addEventListener('focusout', validateField);
        document.getElementById(profileInput).addEventListener('keydown', validateField);
    });
    profileForm && profileForm.addEventListener('submit', e => user.submitLogin(e));
}

const removeProfileEventListeners = () => {
    profileElements.forEach((element) => {
        document.getElementById(element).removeEventListener('keydown', validateField);
        document.getElementById(element).removeEventListener('focusout', validateField);
    });
    profileForm.addEventListener('submit', user.submitLogin);
}

// Address Form EventListeners *************************************************************************************
const formElements = ['firstname', 'lastname', 'addressOne', 'addressTwo', 'postalCode', 'phone'];
const addAddressEventListeners = () => {
    formElements.forEach((element) => {
        document.getElementById(element).addEventListener('focusout', validateField);
        document.getElementById(element).addEventListener('keydown', validateField);
    });
    country.addEventListener('change', user.changeCountryPhoneSelect);
    addressForm && addressForm.addEventListener('submit', e => user.submitAddress(e));
}

const removeAddressEventListeners = () => {
    formElements.forEach((element) => {
        document.getElementById(element).removeEventListener('keydown', validateField);
        document.getElementById(element).removeEventListener('focusout', validateField);
    });
    country.removeEventListener('change', user.changeCountryPhoneSelect);
    addressForm.removeEventListener('submit', user.submitAddress);
}

// Shipping Form Event Listeners *********************************************************************************
const addShipmentEventListeners = () => {
    isGift.addEventListener('click', delivery.toggleGiftOptions);
    giftMessage.addEventListener('keydown', validateField);
    giftMessage.addEventListener('focusout', validateField);
    typeShip.forEach(el => {
        el.addEventListener('change', delivery.chooseShipmentType);
    });
    shipmentForm.addEventListener('submit', (e) => delivery.submitShipment(e));
    confirmOrder.addEventListener('submit', (e) => delivery.submitConfirmForm(e));
}

const removeShipmentEventListeners = () => {
    isGift.removeEventListener('click', delivery.toggleGiftOptions);
    giftMessage.removeEventListener('keydown', validateField);
    giftMessage.removeEventListener('focusout', validateField);
    typeShip.forEach(el => {
        el.removeEventListener('change', delivery.chooseShipmentType);
    });
}

// Order event listener
confirmOrderForm.addEventListener('submit', () => order.domSetHTMLValues());

// Form Helpers **************************************************************************************************
const validateField = (event) => {
    const domElement = event.target;
    if (event.type === 'keydown') setErrorField(domElement, 'hide');

    else {
        switch (event.target.id) {
            case 'username':
                if (domElement.value.length < 5 || domElement.value.length > 20) {
                    setErrorField(domElement, 'show');
                }
                break;
            case 'email':
                if (domElement.value.length > 50 || !domElement.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    setErrorField(domElement, 'show');
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
                if (pw1 != domElement.value) {
                    setErrorField(domElement, 'show', "Passwords do not match");
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
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

// Previous Button *********************************************************************************************
const addPreviousButtonEventListener = () => {
    previousButton.addEventListener('click', () => {
        const page = document.querySelector('.form-step-active').getAttribute('data-target');
        switch (page) {
            case 'address':
                changeDomToNextForm(page, 'profile');
                break;
            case 'ship':
                changeDomToNextForm(page, 'address');
                break;
            case 'confirm':
                changeDomToNextForm(page, 'shipment');
                break;
        }
    });
}

const addExitButtonEventListener = () => {
    exitButton.addEventListener('click', () => {
        // addProductEventListeners();
        // Reset objects
        user.resetUser();
        product.resetProduct();
        delivery.resetShipment();
        order.resetOrder();

        // Reset views
        resetOrderFormsView();

        // Reset forms
        resetAllForms();
    });
}

//Initialize EventListeners ***********************************************************************************
product.getThumbnails('black');
addProductEventListeners();
addProfileEventListeners();
addAddressEventListeners();
addShipmentEventListeners();
addPreviousButtonEventListener();
addExitButtonEventListener();